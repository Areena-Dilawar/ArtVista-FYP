// Sample data for featured artworks
export const featuredArtworks = [
    {
      id: 1,
      name: 'Ethereal Dreams',
      artist: 'Elena Rivera',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 1200,
      category: 'Painting'
    },
    {
      id: 2,
      name: 'Urban Nostalgia',
      artist: 'Javier Chen',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 950,
      category: 'Photography'
    },
    {
      id: 3,
      name: 'Harmony in Clay',
      artist: 'Maria Johnson',
      image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 850,
      category: 'Pottery'
    },
    {
      id: 4,
      name: 'Modern Horizons',
      artist: 'Alexander Wu',
      image: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 1800,
      category: 'Architecture'
    },
    {
      id: 5,
      name: 'Timeless Elegance',
      artist: 'Sophia Patel',
      image: 'https://images.pexels.com/photos/1148498/pexels-photo-1148498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 1550,
      category: 'Sculpture'
    },
    {
      id: 6,
      name: 'Digital Dreamscape',
      artist: 'Marcus Lee',
      image: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 780,
      category: 'Video & Animation'
    }
  ];
  
  // Sample data for top rated artists
  export const topRatedArtists = [
    {
      id: 1,
      name: 'Elena Rivera',
      specialty: 'Abstract Painting',
      image: 'https://images.pexels.com/photos/3228339/pexels-photo-3228339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      followers: 12400
    },
    {
      id: 2,
      name: 'Javier Chen',
      specialty: 'Urban Photography',
      image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      followers: 10900
    },
    {
      id: 3,
      name: 'Maria Johnson',
      specialty: 'Ceramic Art',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      followers: 9800
    },
    {
      id: 4,
      name: 'Alexander Wu',
      specialty: 'Modern Architecture',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      followers: 14300
    },
    {
      id: 5,
      name: 'Sophia Patel',
      specialty: 'Stone Sculpture',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      followers: 11200
    },
    {
      id: 6,
      name: 'Marcus Lee',
      specialty: '3D Animation',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      followers: 10500
    }
  ];
  
  // Sample products for category pages
  export const categoryProducts = {
    Painting: [
      {
        id: 101,
        title: 'Abstract Harmony',
        artist: 'Elena Rivera',
        image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1200,
        description: 'A vibrant expression of emotions through color and form, creating a sense of harmony and balance.'
      },
      {
        id: 102,
        title: 'Serene Landscape',
        artist: 'Thomas Wright',
        image: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 950,
        description: 'A peaceful landscape painting capturing the tranquility of nature at dawn.'
      },
      {
        id: 103,
        title: 'Urban Reflections',
        artist: 'Sophia Patel',
        image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1450,
        description: 'A cityscape painting reflecting the vibrant energy of urban life through contrasting colors.'
      },
      {
        id: 104,
        title: 'Emotional Portrait',
        artist: 'Marcus James',
        image: 'https://images.pexels.com/photos/3094102/pexels-photo-3094102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1800,
        description: 'A powerful portrait that captures the depth of human emotion through expressive brushwork.'
      },
    ],
    Pottery: [
      {
        id: 201,
        title: 'Azure Vase Collection',
        artist: 'Maria Johnson',
        image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 780,
        description: 'A set of handcrafted ceramic vases glazed in various shades of blue, inspired by ocean waves.'
      },
      {
        id: 202,
        title: 'Rustic Tea Set',
        artist: 'Jun Takahashi',
        image: 'https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 650,
        description: 'A complete tea set with an earthy, rustic finish, celebrating the wabi-sabi aesthetic.'
      },
      {
        id: 203,
        title: 'Minimalist Planters',
        artist: 'Emma Clarke',
        image: 'https://images.pexels.com/photos/5825382/pexels-photo-5825382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 450,
        description: 'A trio of simple yet elegant ceramic planters with a matte finish, perfect for indoor plants.'
      },
      {
        id: 204,
        title: 'Decorative Bowl Set',
        artist: 'Daniel Rodriguez',
        image: 'https://images.pexels.com/photos/2162945/pexels-photo-2162945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 550,
        description: 'A set of decorative bowls with intricate patterns, each piece uniquely handcrafted.'
      },
    ],
    Sculpture: [
      {
        id: 301,
        title: 'Bronze Elegance',
        artist: 'Sophia Patel',
        image: 'https://images.pexels.com/photos/134402/pexels-photo-134402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 2200,
        description: 'A bronze sculpture capturing the fluid movement of dance, showcasing both strength and grace.'
      },
      {
        id: 302,
        title: 'Marble Serenity',
        artist: 'Giovanni Ricci',
        image: 'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 3500,
        description: 'A hand-carved marble sculpture representing inner peace and tranquility, with smooth flowing lines.'
      },
      {
        id: 303,
        title: 'Metal Fusion',
        artist: 'Xavier Thompson',
        image: 'https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1850,
        description: 'An abstract metal sculpture created by welding together various industrial materials, symbolizing unity.'
      },
      {
        id: 304,
        title: 'Wooden Spirit',
        artist: 'Isabella Navarro',
        image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1200,
        description: 'A sculpture carved from a single piece of oak, revealing the natural form hidden within the wood.'
      },
    ],
    Architecture: [
      {
        id: 401,
        title: 'Sustainable Home Design',
        artist: 'Alexander Wu',
        image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 5000,
        description: 'A modern residential design focusing on sustainability and harmony with the natural environment.'
      },
      {
        id: 402,
        title: 'Urban Office Concept',
        artist: 'Mia Rodriguez',
        image: 'https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 4500,
        description: 'A contemporary office building design that prioritizes natural light and collaborative spaces.'
      },
      {
        id: 403,
        title: 'Cultural Center Blueprint',
        artist: 'Liam Chang',
        image: 'https://images.pexels.com/photos/137594/pexels-photo-137594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 6000,
        description: 'A comprehensive design for a community cultural center that blends traditional and modern elements.'
      },
      {
        id: 404,
        title: 'Eco-Lodge Concept',
        artist: 'Sarah Jacobsen',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 3800,
        description: 'A design for an eco-friendly lodge that integrates seamlessly with its natural surroundings.'
      },
    ],
    "Video & Animation": [
      {
        id: 501,
        title: 'Digital Dreamscape',
        artist: 'Marcus Lee',
        image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1500,
        description: 'A surreal animated short film exploring the boundaries between dreams and reality.'
      },
      {
        id: 502,
        title: 'Urban Motion',
        artist: 'Jasmine Wong',
        image: 'https://images.pexels.com/photos/2909083/pexels-photo-2909083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1200,
        description: 'A dynamic time-lapse video capturing the energy and rhythm of city life over 24 hours.'
      },
      {
        id: 503,
        title: 'Character Animation Reel',
        artist: 'Tyler Brooks',
        image: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 950,
        description: 'A showcase of character animations demonstrating a range of emotions and movements.'
      },
      {
        id: 504,
        title: 'Abstract Visual Experience',
        artist: 'Luna Kim',
        image: 'https://images.pexels.com/photos/3156381/pexels-photo-3156381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 850,
        description: 'An abstract animation exploring color theory and form through fluid digital art.'
      },
    ],
    Photography: [
      {
        id: 601,
        title: 'Urban Perspectives',
        artist: 'Javier Chen',
        image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 900,
        description: 'A collection of urban landscape photographs capturing unique architectural perspectives.'
      },
      {
        id: 602,
        title: 'Natural Light Portraits',
        artist: 'Emily Johnson',
        image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 750,
        description: 'A series of portrait photographs utilizing only natural light to create intimate, authentic images.'
      },
      {
        id: 603,
        title: 'Wildlife Moments',
        artist: 'David Carter',
        image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1100,
        description: 'Striking photographs capturing rare and beautiful moments in wildlife, printed on archival paper.'
      },
      {
        id: 604,
        title: 'Abstract Macroscapes',
        artist: 'Nina Patel',
        image: 'https://images.pexels.com/photos/1252847/pexels-photo-1252847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 850,
        description: 'Macro photography revealing the abstract patterns and textures found in everyday objects.'
      },
    ],
    Music: [
      {
        id: 701,
        title: 'Symphony No. 5',
        artist: 'Carlos Rivera',
        image: 'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 600,
        description: 'A contemporary classical composition performed by a full orchestra, available as a limited vinyl release.'
      },
      {
        id: 702,
        title: 'Ambient Landscapes',
        artist: 'Eliza Mitchell',
        image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 450,
        description: 'An ambient electronic album designed to create immersive soundscapes for relaxation and focus.'
      },
      {
        id: 703,
        title: 'Jazz Innovations',
        artist: 'Marcus Wilson',
        image: 'https://images.pexels.com/photos/2531731/pexels-photo-2531731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 550,
        description: 'A collection of original jazz compositions pushing the boundaries of the genre with modern influences.'
      },
      {
        id: 704,
        title: 'Folk Traditions',
        artist: 'Sofia Garcia',
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 500,
        description: 'An album exploring global folk music traditions with authentic instruments and vocal techniques.'
      },
    ]
  };
  
  // Sample tools for each category
  export const categoryTools = {
    Painting: [
      {
        id: 1001,
        title: 'Professional Acrylic Set',
        image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 120,
        description: 'A set of 24 professional-grade acrylic paints with vibrant pigments and excellent lightfastness.'
      },
      {
        id: 1002,
        title: 'Artist Brush Collection',
        image: 'https://images.pexels.com/photos/3822943/pexels-photo-3822943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 85,
        description: 'A comprehensive set of 15 brushes in various shapes and sizes for different painting techniques.'
      },
      {
        id: 1003,
        title: 'Canvas Multi-Pack',
        image: 'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 60,
        description: 'A package of 5 pre-stretched, primed canvases in assorted sizes, ready for painting.'
      },
      {
        id: 1004,
        title: 'Premium Easel',
        image: 'https://images.pexels.com/photos/5849559/pexels-photo-5849559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 150,
        description: 'An adjustable wooden easel with a sturdy base, suitable for canvases up to 48 inches tall.'
      },
    ],
    Pottery: [
      {
        id: 2001,
        title: 'Pottery Wheel',
        image: 'https://images.pexels.com/photos/1850030/pexels-photo-1850030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 650,
        description: 'A professional pottery wheel with variable speed control and a sturdy steel frame.'
      },
      {
        id: 2002,
        title: 'Ceramic Clay Pack',
        image: 'https://images.pexels.com/photos/3094506/pexels-photo-3094506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 45,
        description: 'A 25-pound package of high-quality ceramic clay, perfect for wheel throwing or hand building.'
      },
      {
        id: 2003,
        title: 'Glazing Kit',
        image: 'https://images.pexels.com/photos/4050474/pexels-photo-4050474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 120,
        description: 'A complete glazing kit with 12 different colors, brushes, and application tools.'
      },
      {
        id: 2004,
        title: 'Pottery Tool Set',
        image: 'https://images.pexels.com/photos/2162941/pexels-photo-2162941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 75,
        description: 'A comprehensive set of 15 pottery tools for carving, shaping, and detailing ceramic pieces.'
      },
    ],
    Sculpture: [
      {
        id: 3001,
        title: 'Sculpting Clay Set',
        image: 'https://images.pexels.com/photos/5806999/pexels-photo-5806999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 85,
        description: 'A set of 5 different types of sculpting clay, including oil-based, water-based, and polymer varieties.'
      },
      {
        id: 3002,
        title: 'Stone Carving Kit',
        image: 'https://images.pexels.com/photos/4503268/pexels-photo-4503268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 180,
        description: 'A professional stone carving kit with chisels, hammers, and files for working with soft stone.'
      },
      {
        id: 3003,
        title: 'Armature Wire Pack',
        image: 'https://images.pexels.com/photos/5816303/pexels-photo-5816303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 35,
        description: 'Multiple gauges of aluminum wire for creating strong, lightweight armatures for sculptures.'
      },
      {
        id: 3004,
        title: 'Sculpting Stand',
        image: 'https://images.pexels.com/photos/7586230/pexels-photo-7586230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 120,
        description: 'An adjustable sculpting stand with a rotating top, allowing easy access to all sides of your work.'
      },
    ],
    Architecture: [
      {
        id: 4001,
        title: 'Professional Drafting Table',
        image: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 350,
        description: 'An adjustable drafting table with built-in storage and a smooth, durable surface.'
      },
      {
        id: 4002,
        title: 'Architectural Model Kit',
        image: 'https://images.pexels.com/photos/3990129/pexels-photo-3990129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 120,
        description: 'A comprehensive kit for creating professional architectural models, including various materials and tools.'
      },
      {
        id: 4003,
        title: 'Technical Drawing Set',
        image: 'https://images.pexels.com/photos/3036632/pexels-photo-3036632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 85,
        description: 'A complete set of technical drawing tools, including mechanical pencils, rulers, and templates.'
      },
      {
        id: 4004,
        title: '3D Printing Starter Kit',
        image: 'https://images.pexels.com/photos/3112078/pexels-photo-3112078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 550,
        description: 'Everything needed to start creating 3D printed architectural models, including printer and materials.'
      },
    ],
    "Video & Animation": [
      {
        id: 5001,
        title: 'Animation Tablet Pro',
        image: 'https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 450,
        description: 'A professional-grade drawing tablet with pressure sensitivity and tilt recognition for digital animation.'
      },
      {
        id: 5002,
        title: 'Animation Software Suite',
        image: 'https://images.pexels.com/photos/6804594/pexels-photo-6804594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 350,
        description: 'A comprehensive software package for 2D and 3D animation, with a perpetual license.'
      },
      {
        id: 5003,
        title: 'Professional Video Lights',
        image: 'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 220,
        description: 'A set of adjustable LED lights with diffusers and stands for professional video production.'
      },
      {
        id: 5004,
        title: 'Stop Motion Animation Kit',
        image: 'https://images.pexels.com/photos/3045625/pexels-photo-3045625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 180,
        description: 'Everything needed for stop motion animation, including software, camera mount, and materials.'
      },
    ],
    Photography: [
      {
        id: 6001,
        title: 'Professional DSLR Camera',
        image: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1200,
        description: 'A high-resolution digital camera with manual controls and interchangeable lens capability.'
      },
      {
        id: 6002,
        title: 'Photography Lighting Kit',
        image: 'https://images.pexels.com/photos/1677764/pexels-photo-1677764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 350,
        description: 'A complete studio lighting kit with strobes, softboxes, stands, and wireless triggers.'
      },
      {
        id: 6003,
        title: 'Prime Lens Collection',
        image: 'https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 900,
        description: 'A set of three prime lenses (35mm, 50mm, 85mm) with fast apertures for professional photography.'
      },
      {
        id: 6004,
        title: 'Professional Tripod',
        image: 'https://images.pexels.com/photos/1787221/pexels-photo-1787221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 180,
        description: 'A sturdy carbon fiber tripod with ball head, suitable for studio and location photography.'
      },
    ],
    Music: [
      {
        id: 7001,
        title: 'Digital Audio Workstation',
        image: 'https://images.pexels.com/photos/6785588/pexels-photo-6785588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 450,
        description: 'Professional music production software with virtual instruments, effects, and mixing tools.'
      },
      {
        id: 7002,
        title: 'Studio Microphone Kit',
        image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 380,
        description: 'A professional condenser microphone with shock mount, pop filter, and audio interface.'
      },
      {
        id: 7003,
        title: 'MIDI Keyboard Controller',
        image: 'https://images.pexels.com/photos/6962009/pexels-photo-6962009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 220,
        description: 'A 49-key MIDI controller with velocity-sensitive keys and assignable knobs and faders.'
      },
      {
        id: 7004,
        title: 'Studio Monitor Speakers',
        image: 'https://images.pexels.com/photos/13733654/pexels-photo-13733654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 550,
        description: 'A pair of professional studio monitor speakers for accurate audio monitoring during production.'
      },
    ]
  };
  
  // Services offered
  export const services = [
    {
      id: 1,
      title: 'Custom Art Commission',
      image: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Request personalized artwork created specifically for you by our top-rated artists.',
      price: 'Starting at $300',
      details: 'Our custom art commission service connects you with talented artists who can bring your vision to life. Whether you need a portrait, landscape, abstract piece, or any other style, we`ll match you with the perfect artist for your project. The process includes consultation, concept sketches, progress updates, and final delivery of your unique artwork.'
    },
    {
      id: 2,
      title: 'Art Restoration',
      image: 'https://images.pexels.com/photos/3094101/pexels-photo-3094101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Professional restoration services to preserve and rejuvenate damaged or aging artwork.',
      price: 'Starting at $200',
      details: 'Our art restoration experts carefully assess and repair damaged artworks to restore their original beauty. We handle paintings, sculptures, frames, and more, using conservation-grade materials and techniques. Each restoration project begins with a detailed examination and documentation, followed by a tailored treatment plan to address specific issues such as tears, discoloration, or structural damage.'
    },
    {
      id: 3,
      title: 'Art Installation',
      image: 'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Professional mounting and installation of artwork in homes, offices, and public spaces.',
      price: 'Starting at $150',
      details: 'Our installation team ensures your artwork is perfectly positioned and securely mounted. We handle everything from small gallery installations to large-scale public art projects. Services include site assessment, hardware selection, precise positioning, lighting recommendations, and professional mounting that protects both your artwork and walls. We also offer custom framing solutions to complement your space.'
    },
    {
      id: 4,
      title: 'Virtual Art Classes',
      image: 'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Learn artistic techniques through online classes taught by experienced artists.',
      price: 'Starting at $45 per session',
      details: 'Develop your artistic skills through our interactive online classes. We offer courses for all skill levels in various mediums including painting, drawing, sculpture, digital art, and more. Each class provides real-time instruction, personalized feedback, and a supportive community of fellow artists. Courses range from one-time workshops to comprehensive multi-week programs, with flexible scheduling options.'
    },
    {
      id: 5,
      title: 'Art Consultation',
      image: 'https://images.pexels.com/photos/6893988/pexels-photo-6893988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Expert guidance on art selection, curation, and collection development.',
      price: 'Starting at $120',
      details: 'Our art consultants provide personalized advice to help you build a meaningful collection or find the perfect piece for your space. Services include style assessment, budget planning, artist research, acquisition assistance, and ongoing collection management. We work with individuals, businesses, and institutions to develop art collections that reflect unique aesthetics and objectives.'
    },
    {
      id: 6,
      title: 'Portfolio Development',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Professional guidance to create or enhance your artistic portfolio.',
      price: 'Starting at $180',
      details: 'Designed for emerging artists, our portfolio development service helps you create a compelling presentation of your work. Our industry experts provide guidance on selecting your strongest pieces, photographing artwork professionally, writing artist statements, creating digital portfolios, and preparing materials for gallery submissions, grant applications, or academic admissions.'
    }
  ];