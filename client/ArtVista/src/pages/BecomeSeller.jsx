import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Camera, Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../Api/apiService';

const artCategories = [
  'Painting', 'Sculpture', 'Digital Art', 'Photography',
  'Printmaking', 'Ceramics', 'Textiles', 'Mixed Media',
  'Installation', 'Performance', 'Video & Animation', 'Other'
];

function BecomeSeller() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    artistName: '',
    bio: '',
    specialty: '',
    website: '',
    instagram: '',
    portfolioImages: [],
    selectedCategories: [],
    experience: '',
    termsAccepted: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle category selection
  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const currentCategories = [...prev.selectedCategories];

      if (currentCategories.includes(category)) {
        return {
          ...prev,
          selectedCategories: currentCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...currentCategories, category]
        };
      }
    });
  };

  // Handle image upload with API integration
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    setUploadingImage(true);
    setError('');

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 5MB.`);
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not a valid image format.`);
        }

        try {
          // If you have an image upload endpoint, use it
          // const uploadResponse = await apiService.uploadImage(file);
          // return {
          //   name: file.name,
          //   size: file.size,
          //   type: file.type,
          //   url: uploadResponse.url,
          //   preview: uploadResponse.url
          // };

          // For now, create local preview (you can replace this with actual upload)
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            preview: URL.createObjectURL(file),
            file: file // Store file for later upload
          };
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          throw new Error(`Failed to upload ${file.name}`);
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, ...uploadedImages]
      }));

    } catch (error) {
      setError(error.message || 'Failed to upload images. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove uploaded image
  const removeImage = (index) => {
    setFormData(prev => {
      const imageToRemove = prev.portfolioImages[index];
      // Clean up object URL to prevent memory leaks
      if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      
      return {
        ...prev,
        portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
      };
    });
  };

  // Move between form steps
  const goToNextStep = () => {
    // Validate current step
    if (formStep === 1) {
      if (!formData.artistName || !formData.bio || !formData.specialty) {
        setError('Please fill in all required fields');
        return;
      }
    } else if (formStep === 2) {
      if (formData.portfolioImages.length === 0) {
        setError('Please upload at least one portfolio image');
        return;
      }
    } else if (formStep === 3) {
      if (formData.selectedCategories.length === 0) {
        setError('Please select at least one category');
        return;
      }

      if (!formData.experience) {
        setError('Please describe your artistic experience');
        return;
      }
    }

    setError('');
    setFormStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  // Handle form submission with API integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      // Prepare data for API
      const artistData = {
        name: formData.artistName,
        specialty: formData.specialty,
        bio: formData.bio,
        image: formData.portfolioImages.length > 0 ? formData.portfolioImages[0].preview : null,
        // Additional fields that might be useful
        website: formData.website,
        instagram: formData.instagram,
        categories: formData.selectedCategories,
        experience: formData.experience,
        portfolioImages: formData.portfolioImages.map(img => img.preview || img.url)
      };

      // Submit to API
      const response = await apiService.submitArtistApplication(artistData);
      
      console.log('Artist application submitted successfully:', response);

      // Update user profile in context
      await updateUserProfile({
        artistProfile: {
          name: formData.artistName,
          specialty: formData.specialty,
          bio: formData.bio
        },
        pendingArtistApplication: true
      });

      setApplicationSubmitted(true);
      
      // Clean up object URLs
      formData.portfolioImages.forEach(image => {
        if (image.preview && image.preview.startsWith('blob:')) {
          URL.revokeObjectURL(image.preview);
        }
      });

    } catch (error) {
      console.error('Application submission failed:', error);
      setError(
        error.message || 
        'Failed to submit your application. Please check your internet connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        {/* Application Success Message */}
        {applicationSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-gray-900/50 rounded-lg p-8 border border-green-500/30 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for applying to become a seller on ARTVISTA. Our team will review your application and get back to you within 3-5 business days.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Return to Home
              </button>
              <button
                onClick={() => navigate('/customer-dashboard')}
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-4"
              >
                BECOME A SELLER
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                className="h-1 bg-white/30 mx-auto rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 mt-6"
              >
                Join our community of talented artists and start selling your artwork to customers around the world.
              </motion.p>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex justify-between items-center">
                {['Artist Info', 'Portfolio', 'Experience', 'Review'].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep > index + 1
                          ? 'bg-green-500 text-black'
                          : formStep === index + 1
                            ? 'bg-white text-black'
                            : 'bg-gray-700 text-white'
                        }`}
                    >
                      {formStep > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className="text-xs mt-2">{step}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full"></div>
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(formStep - 1) * 33.33}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Artist Info */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="artistName" className="block text-sm font-medium text-gray-300 mb-1">
                        Artist Name *
                      </label>
                      <input
                        type="text"
                        id="artistName"
                        name="artistName"
                        value={formData.artistName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Your artist name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="specialty" className="block text-sm font-medium text-gray-300 mb-1">
                        Primary Specialty *
                      </label>
                      <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="e.g., Abstract Painting, Portrait Photography"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Artist Bio *
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Tell us about yourself, your artistic journey, and your creative approach"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                          Website (Optional)
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
                          Instagram Handle (Optional)
                        </label>
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="@yourusername"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Portfolio */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        Upload Portfolio Images *
                      </label>
                      <p className="text-gray-400 text-sm mb-4">
                        Upload 3-5 high-quality images that represent your best work. These will be reviewed as part of your application.
                      </p>

                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                        <Camera className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">Drag and drop your images here, or</p>

                        <label className="relative inline-block cursor-pointer">
                          <input
                            type="file"
                            id="portfolio"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <span className={`px-4 py-2 rounded-lg transition-colors ${uploadingImage 
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                            : 'bg-white text-black hover:bg-gray-200 cursor-pointer'
                          }`}>
                            {uploadingImage ? 'Uploading...' : 'Browse Files'}
                          </span>
                        </label>

                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: JPG, PNG, WEBP. Max file size: 5MB
                        </p>
                      </div>
                    </div>

                    {/* Preview uploaded images */}
                    {formData.portfolioImages.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-3">
                          Uploaded Images ({formData.portfolioImages.length})
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {formData.portfolioImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.preview}
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Experience */}
                {formStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        Select Art Categories *
                      </label>
                      <p className="text-gray-400 text-sm mb-4">
                        Choose the categories that best represent your work. Select all that apply.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {artCategories.map((category) => (
                          <div
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            className={`px-4 py-2 rounded-lg cursor-pointer text-center transition-colors ${formData.selectedCategories.includes(category)
                                ? 'bg-white/20 border border-white'
                                : 'bg-gray-800 border border-gray-700 hover:border-gray-500'
                              }`}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                        Artistic Experience *
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows="5"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Describe your artistic journey, exhibitions, education, awards, etc."
                        required
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {formStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold">Review Your Application</h2>
                    <p className="text-gray-300">
                      Please review your application details before submitting.
                    </p>

                    <div className="border border-gray-700 rounded-lg divide-y divide-gray-700">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-400">Artist Information</h3>
                        <p className="mt-1 font-medium">{formData.artistName}</p>
                        <p className="mt-1 text-gray-400">{formData.specialty}</p>
                        <p className="mt-2 text-sm text-gray-300">{formData.bio}</p>
                      </div>

                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-400">Portfolio</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.portfolioImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.preview}
                              alt={`Portfolio ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-400">Categories</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.selectedCategories.map((category) => (
                            <span
                              key={category}
                              className="px-2 py-1 bg-gray-800 rounded-full text-xs"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                          required
                        />
                        <span className="text-sm text-gray-300">
                          I agree to the <a href="/terms" className="text-white underline">Seller Terms and Conditions</a> and
                          confirm that my submitted work is original and owned by me.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {formStep > 1 && (
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      disabled={submitting}
                      className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  )}

                  {formStep < 4 ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={uploadingImage}
                      className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadingImage ? 'Processing...' : 'Continue'}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors ml-auto flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default BecomeSeller;