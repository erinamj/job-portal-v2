// Jobs data
const jobsData = [
	{
		id: 1,
		title: 'Web Developer',
		type: 'Full Time',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/prod-img.png',
		company: 'Tech Solutions Inc.',
		salary: '$70,000 - $90,000',
		description:
			'We are looking for an experienced Web Developer to join our team. You will be responsible for developing and maintaining web applications.',
		link: 'employerdetails.html',
	},
	{
		id: 2,
		title: 'Product Design',
		type: 'Part Time',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/prod-img.png',
		company: 'Design Studio',
		salary: '$50,000 - $65,000',
		description:
			'Join our creative team as a Product Designer. Create beautiful and functional designs for our digital products.',
		link: '#',
	},
	{
		id: 3,
		title: 'Architect',
		type: 'Full Time',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/architect.png',
		company: 'Architecture Plus',
		salary: '$80,000 - $110,000',
		description:
			'Seeking a talented Architect to design innovative building projects. Experience with modern design principles required.',
		link: '#',
	},
	{
		id: 4,
		title: 'Front-End Developer',
		type: 'Internship',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/prod-img.png',
		company: 'Startup Hub',
		salary: '$25,000 - $35,000',
		description:
			'Great opportunity for students or recent graduates to gain hands-on experience in front-end development.',
		link: '#',
	},
	{
		id: 5,
		title: 'Web Maintenance',
		type: 'Part Time',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/prod-img.png',
		company: 'Web Services Co.',
		salary: '$40,000 - $55,000',
		description:
			'Part-time position for maintaining and updating existing websites. Flexible hours available.',
		link: '#',
	},
	{
		id: 6,
		title: 'Photoshop Designer',
		type: 'Part Time',
		location: '2708 Scenic Way, IL 62373',
		image: '../images/prod-img.png',
		company: 'Creative Agency',
		salary: '$35,000 - $50,000',
		description:
			'Looking for a skilled Photoshop Designer to create stunning visual content for our clients.',
		link: '#',
	},
	{
		id: 7,
		title: 'Backend Developer',
		type: 'Full Time',
		location: '123 Tech Avenue, CA 90210',
		image: '../images/prod-img.png',
		company: 'Cloud Systems',
		salary: '$85,000 - $105,000',
		description:
			'Experienced Backend Developer needed to build scalable server-side applications and APIs.',
		link: '#',
	},
	{
		id: 8,
		title: 'UI/UX Designer',
		type: 'Full Time',
		location: '456 Design Street, NY 10001',
		image: '../images/prod-img.png',
		company: 'User Experience Labs',
		salary: '$75,000 - $95,000',
		description:
			'Create intuitive and engaging user experiences. Work with cross-functional teams to design user interfaces.',
		link: '#',
	},
	{
		id: 9,
		title: 'Data Analyst',
		type: 'Full Time',
		location: '789 Business Blvd, TX 75001',
		image: '../images/prod-img.png',
		company: 'Analytics Pro',
		salary: '$65,000 - $85,000',
		description:
			'Analyze complex data sets to help drive business decisions. Strong analytical skills required.',
		link: '#',
	},
	{
		id: 10,
		title: 'Content Writer',
		type: 'Part Time',
		location: '321 Content Lane, FL 33101',
		image: '../images/prod-img.png',
		company: 'Content Creators',
		salary: '$30,000 - $45,000',
		description:
			'Write engaging content for websites, blogs, and marketing materials. Remote work available.',
		link: '#',
	},
	{
		id: 11,
		title: 'Project Manager',
		type: 'Full Time',
		location: '555 Management Way, WA 98101',
		image: '../images/prod-img.png',
		company: 'Project Solutions',
		salary: '$90,000 - $120,000',
		description:
			'Lead project teams and ensure successful delivery of projects on time and within budget.',
		link: '#',
	},
	{
		id: 12,
		title: 'Marketing Specialist',
		type: 'Full Time',
		location: '888 Marketing Drive, IL 60601',
		image: '../images/prod-img.png',
		company: 'Marketing Experts',
		salary: '$55,000 - $75,000',
		description:
			'Develop and execute marketing campaigns to promote our products and services.',
		link: '#',
	},
]

// Companies data
const companiesData = [
	{
		id: 1,
		name: 'Tech Innovations Inc.',
		logo: '../images/company1.logo.jpg',
		description:
			"Leading technology company specializing in AI and machine learning solutions. We're revolutionizing the way businesses operate through cutting-edge technology.",
		website: 'https://techinnovations.example.com',
		industry: 'Technology',
		location: 'San Francisco, CA',
	},
	{
		id: 2,
		name: 'Global Finance Corp',
		logo: '../images/company2.logo.jpg',
		description:
			'Premier financial services provider offering comprehensive banking and investment solutions to individuals and businesses worldwide.',
		website: 'https://globalfinance.example.com',
		industry: 'Finance',
		location: 'New York, NY',
	},
	{
		id: 3,
		name: 'Creative Media Group',
		logo: '../images/company3.logo.jpg',
		description:
			'Award-winning digital media agency creating innovative marketing campaigns and brand experiences that captivate audiences.',
		website: 'https://creativemedia.example.com',
		industry: 'Media & Marketing',
		location: 'Los Angeles, CA',
	},
	{
		id: 4,
		name: 'HealthCare Solutions',
		logo: '../images/company1.logo.jpg',
		description:
			'Dedicated to improving patient care through innovative healthcare technology and comprehensive medical services.',
		website: 'https://healthcaresolutions.example.com',
		industry: 'Healthcare',
		location: 'Boston, MA',
	},
	{
		id: 5,
		name: 'EcoEnergy Systems',
		logo: '../images/company2.logo.jpg',
		description:
			'Pioneering sustainable energy solutions to create a cleaner, greener future for generations to come.',
		website: 'https://ecoenergy.example.com',
		industry: 'Renewable Energy',
		location: 'Austin, TX',
	},
	{
		id: 6,
		name: 'Quantum Software Labs',
		logo: '../images/company3.logo.jpg',
		description:
			"Developing next-generation software solutions that push the boundaries of what's possible in computing.",
		website: 'https://quantumlabs.example.com',
		industry: 'Software Development',
		location: 'Seattle, WA',
	},
	{
		id: 7,
		name: 'Retail Excellence Co.',
		logo: '../images/company1.logo.jpg',
		description:
			'Transforming the retail experience with innovative e-commerce platforms and customer-centric solutions.',
		website: 'https://retailexcellence.example.com',
		industry: 'Retail',
		location: 'Chicago, IL',
	},
	{
		id: 8,
		name: 'Automotive Dynamics',
		logo: '../images/company2.logo.jpg',
		description:
			'Leading the automotive industry with cutting-edge electric vehicle technology and sustainable transportation solutions.',
		website: 'https://autodynamics.example.com',
		industry: 'Automotive',
		location: 'Detroit, MI',
	},
	{
		id: 9,
		name: 'Education Hub',
		logo: '../images/company3.logo.jpg',
		description:
			'Empowering learners worldwide through innovative online education platforms and personalized learning experiences.',
		website: 'https://educationhub.example.com',
		industry: 'Education',
		location: 'Cambridge, MA',
	},
	{
		id: 10,
		name: 'Construction Masters',
		logo: '../images/company1.logo.jpg',
		description:
			'Building the future with sustainable construction practices and state-of-the-art engineering solutions.',
		website: 'https://constructionmasters.example.com',
		industry: 'Construction',
		location: 'Denver, CO',
	},
	{
		id: 11,
		name: 'Food & Hospitality Group',
		logo: '../images/company2.logo.jpg',
		description:
			'Creating memorable dining experiences with world-class restaurants and hospitality services.',
		website: 'https://foodhospitality.example.com',
		industry: 'Food & Hospitality',
		location: 'Miami, FL',
	},
	{
		id: 12,
		name: 'Logistics Pro',
		logo: '../images/company3.logo.jpg',
		description:
			'Streamlining global supply chains with advanced logistics solutions and efficient delivery systems.',
		website: 'https://logisticspro.example.com',
		industry: 'Logistics',
		location: 'Memphis, TN',
	},
]
