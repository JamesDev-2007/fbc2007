import { Sermon, Event, BlogPost, Ministry, QuizQuestion, Leader, HistoryMilestone, GalleryImage, Post } from '../types';

export const sermons: Sermon[] = [
  { id: '1', title: 'The Power of Faith', preacher: 'Rev. Dr. S.O. Afolabi', date: '2024-07-21', description: 'Discover how unwavering faith can move mountains in your life.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', audioUrl: 'audio1.mp3', tags: ['faith', 'hope'] },
  { id: '2', title: 'Living in God\'s Love', preacher: 'Rev. Dr. S.O. Afolabi', date: '2024-07-14', description: 'Understanding the depths of God\'s unconditional love for us.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', audioUrl: 'audio2.mp3', tags: ['love', 'grace'] },
  { id: '3', title: 'A Hope That Anchors', preacher: 'Guest Speaker', date: '2024-07-07', description: 'Finding a steadfast hope in turbulent times.', audioUrl: 'audio3.mp3', tags: ['hope', 'perseverance'] },
  { id: '4', title: 'The Grace of Forgiveness', preacher: 'Rev. Dr. S.O. Afolabi', date: '2024-06-30', description: 'Exploring the freedom that comes from giving and receiving forgiveness.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', audioUrl: 'audio4.mp3', tags: ['forgiveness', 'grace', 'love'] },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Summer Picnic',
    date: '2024-08-10',
    time: '12:00 PM',
    location: 'Central Park, Lagos',
    description: 'Join us for a day of fun, food, and fellowship at our annual church picnic. There will be games for all ages, a barbecue lunch, and a time of worship together in nature.',
    category: 'Special Event',
    imageUrl: 'https://picsum.photos/800/400?random=10',
    rsvpLink: '#'
  },
  {
    id: '2',
    title: 'Youth Night - Ignite',
    date: '2024-08-16',
    time: '7:00 PM',
    location: 'Church Hall',
    description: 'A special night for our youth with exciting games, live worship from the youth band, and a powerful message on finding your purpose.',
    category: 'Youth Program',
    imageUrl: 'https://picsum.photos/800/400?random=11',
  },
  {
    id: '3',
    title: 'Women\'s Conference - Flourish',
    date: '2024-09-05',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Sanctuary',
    description: 'A day of empowerment and spiritual growth for all women. Featuring guest speaker Dr. Anita Grace and worship sessions led by Melody Richards.',
    category: 'Major Program',
    imageUrl: 'https://picsum.photos/800/400?random=12',
    guestSpeakers: ['Dr. Anita Grace'],
    rsvpLink: '#'
  },
  {
    id: 'sun-service',
    title: 'Sunday Worship Service',
    date: '2024-01-07', // An arbitrary start date in the past
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly Sunday worship service, featuring praise and worship, a sermon from our Pastor, and fellowship.',
    category: 'Regular Service',
    isRecurring: true,
    recurringDay: 0 // Sunday
  },
  {
    id: 'mid-service',
    title: 'Midweek Bible Study',
    date: '2024-01-03', // An arbitrary start date in the past
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Dive deeper into the Word of God with our interactive midweek Bible study. A great opportunity for learning and discussion.',
    category: 'Regular Service',
    isRecurring: true,
    recurringDay: 3 // Wednesday
  },
   {
    id: 'past-1',
    title: 'Easter Crusade 2024',
    date: '2024-03-31',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Celebrating the resurrection of our Lord Jesus Christ with a special Easter service and cantata.',
    category: 'Major Program',
    imageUrl: 'https://picsum.photos/800/400?random=13',
  },
  {
    id: 'past-2',
    title: 'Christmas Carol Service 2023',
    date: '2023-12-24',
    time: '6:00 PM',
    location: 'Main Sanctuary',
    description: 'A beautiful evening of carols, scripture readings, and special performances to celebrate the birth of Jesus.',
    category: 'Special Event',
    imageUrl: 'https://picsum.photos/800/400?random=14',
  }
];


export const blogPosts: BlogPost[] = [
  { id: '1', title: 'Finding Joy in the Everyday', author: 'Jane Smith', date: '2024-07-18', excerpt: 'It\'s easy to seek joy in big moments, but what about the small, everyday blessings? Let\'s explore...', content: 'Full content goes here.' },
  { id: '2', title: 'The Purpose of Prayer', author: 'Rev. Dr. S.O. Afolabi', date: '2024-07-10', excerpt: 'Prayer is more than just a list of requests; it\'s a conversation with our Creator. It aligns our hearts with His...', content: 'Full content goes here.' },
];

export const ministries: Ministry[] = [
  { id: '1', name: 'Youth Ministry', description: 'Guiding the next generation to build a strong foundation in Christ through fun, fellowship, and faith.', leader: 'Mark & Sarah Lee', imageUrl: 'https://picsum.photos/400/300?random=1' },
  { id: '2', name: 'Women\'s Fellowship', description: 'Creating a community of women who support, encourage, and uplift one another in their spiritual journey.', leader: 'Grace Johnson', imageUrl: 'https://picsum.photos/400/300?random=2' },
  { id: '3', name: 'Men\'s Group', description: 'Challenging men to be spiritual leaders in their homes, church, and community.', leader: 'David Chen', imageUrl: 'https://picsum.photos/400/300?random=3' },
  { id: '4', name: 'Music & Worship Team', description: 'Leading the congregation into the presence of God through music and song.', leader: 'Melody Richards', imageUrl: 'https://picsum.photos/400/300?random=4' },
];

export const quizQuestions: QuizQuestion[] = [
  { question: 'Who was swallowed by a great fish?', options: ['Moses', 'Jonah', 'David', 'Abraham'], correctAnswer: 'Jonah' },
  { question: 'How many disciples did Jesus have?', options: ['10', '11', '12', '13'], correctAnswer: '12' },
  { question: 'What is the first book of the New Testament?', options: ['Genesis', 'Revelation', 'Matthew', 'Psalms'], correctAnswer: 'Matthew' },
  { question: 'Who built the ark?', options: ['Noah', 'Adam', 'Solomon', 'Peter'], correctAnswer: 'Noah' },
  { question: 'What did David use to defeat Goliath?', options: ['A sword', 'A spear', 'A sling and a stone', 'His bare hands'], correctAnswer: 'A sling and a stone' },
];

export const leaders: Leader[] = [
  {
    id: '1',
    name: 'Rev. Dr. S.O. Afolabi',
    position: 'Senior Pastor',
    category: 'Pastor',
    imageUrl: 'https://picsum.photos/400/400?random=20',
    shortBio: 'Leading our congregation with wisdom and grace, Rev. Dr. Afolabi has been our shepherd since 2000.',
    fullBio: 'Rev. Dr. S.O. Afolabi joined First Baptist Church Itire in the year 2000, bringing with him a profound passion for the Gospel and a heart for the community. Under his leadership, the church has seen tremendous growth, both spiritually and in numbers. He holds a Doctorate in Theology and has authored several books on faith and Christian living. His ministry focuses on sound biblical teaching, compassionate outreach, and equipping believers to live out their God-given purpose.'
  },
  {
    id: '2',
    name: 'Deacon James Adeboye',
    position: 'Chairman, Board of Deacons',
    category: 'Deacon',
    imageUrl: 'https://picsum.photos/400/400?random=21',
    shortBio: 'A dedicated servant and a pillar of our church, Deacon Adeboye has served faithfully for over two decades.',
    fullBio: 'Deacon James Adeboye has been a member of FBC Itire for over 30 years and has served on the Board of Deacons for 20 of them. As Chairman, he provides spiritual oversight and guidance, working closely with the Senior Pastor to minister to the needs of the congregation. He is known for his gentle spirit, wise counsel, and unwavering commitment to the church family.'
  },
  {
    id: '3',
    name: 'Deaconess Grace Okoro',
    position: 'Deaconess',
    category: 'Deacon',
    imageUrl: 'https://picsum.photos/400/400?random=22',
    shortBio: 'A compassionate leader with a heart for service, especially within our women\'s and children\'s ministries.',
    fullBio: 'Deaconess Grace Okoro is a cornerstone of our church\'s compassionate care ministries. She plays a pivotal role in the Women\'s Fellowship and oversees the Sunday School program, ensuring that the youngest members of our congregation are nurtured in faith. Her home is always open, and she is a beloved mentor to many.'
  },
    {
    id: '4',
    name: 'Mr. David Chen',
    position: 'Church Treasurer',
    category: 'Office Holder',
    imageUrl: 'https://picsum.photos/400/400?random=23',
    shortBio: 'Managing the church\'s finances with integrity and transparency, ensuring good stewardship of God\'s resources.',
    fullBio: 'With a professional background in finance, Mr. David Chen volunteers his expertise as the Church Treasurer. He is responsible for financial planning, budgeting, and reporting. His meticulous work ensures that the church operates on a sound financial footing, allowing our ministries to flourish and grow.'
  },
  {
    id: '5',
    name: 'Mrs. Melody Richards',
    position: 'Choir Master',
    category: 'Office Holder',
    imageUrl: 'https://picsum.photos/400/400?random=24',
    shortBio: 'Leading our worship team in creating a powerful and uplifting atmosphere of praise every Sunday.',
    fullBio: 'Mrs. Melody Richards has a gift for music that she joyfully shares as our Choir Master. She directs the church choir and the worship team, blending traditional hymns with contemporary worship songs. Her leadership helps usher the congregation into the presence of God each week.'
  },
  {
    id: '6',
    name: 'Mrs. Sarah Lee',
    position: 'Sunday School Coordinator',
    category: 'Office Holder',
    imageUrl: 'https://picsum.photos/400/400?random=25',
    shortBio: 'Passionate about teaching children the foundations of faith in a fun, engaging, and loving environment.',
    fullBio: 'As the Sunday School Coordinator, Mrs. Sarah Lee is dedicated to the spiritual education of our children. She develops curriculum, trains volunteer teachers, and creates a safe and exciting learning environment where kids can discover the love of Jesus. Her energy and creativity are a blessing to our youngest members.'
  }
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: '1970',
    title: 'A Humble Beginning',
    description: 'First Baptist Church Itire was founded by a small group of believers in a rented storefront, with a passionate vision to serve the local community.',
    imageUrl: 'https://picsum.photos/600/400?random=30'
  },
  {
    year: '1985',
    title: 'Our First Building',
    description: 'Through faith and the generous contributions of its members, the church constructed its first dedicated sanctuary at our current location.',
    imageUrl: 'https://picsum.photos/600/400?random=31'
  },
  {
    year: '2000',
    title: 'New Leadership',
    description: 'Rev. Dr. S.O. Afolabi was appointed as the Senior Pastor, ushering in a new era of growth and community outreach.',
    imageUrl: 'https://picsum.photos/600/400?random=32'
  },
  {
    year: '2005',
    title: 'First Mission Trip',
    description: 'The church organized its first international mission trip, sending a team to provide aid and share the Gospel in a neighboring country.',
    imageUrl: 'https://picsum.photos/600/400?random=34'
  },
  {
    year: '2010',
    title: 'Community Center Opens',
    description: 'A new wing was added to the church building, establishing a community center that offers tutoring, food pantry services, and youth programs.',
    imageUrl: 'https://picsum.photos/600/400?random=35'
  },
  {
    year: '2015',
    title: 'Worship Album Release',
    description: 'Our Music & Worship Team recorded and released their first live worship album, "Echoes of Grace", sharing our songs with a wider audience.',
    imageUrl: 'https://picsum.photos/600/400?random=36'
  },
  {
    year: '2018',
    title: 'Digital Ministry Launch',
    description: 'FBC Itire launched its online campus, livestreaming services and creating digital resources to reach people around the world.',
    imageUrl: 'https://picsum.photos/600/400?random=37'
  },
  {
    year: '2020',
    title: '50th Anniversary',
    description: 'We celebrated 50 years of God\'s faithfulness with a year of special events, services, and community projects.',
    imageUrl: 'https://picsum.photos/600/400?random=38'
  },
  {
    year: '2022',
    title: 'Youth Ministry Expansion',
    description: 'A major renovation of the youth hall was completed, creating a modern and welcoming space for our growing youth ministry.',
    imageUrl: 'https://picsum.photos/600/400?random=39'
  },
  {
    year: 'Present Day',
    title: 'A Thriving Community',
    description: 'Today, FBC Itire is a vibrant, multi-generational church family, continuing its legacy of faith, hope, and love in the heart of the city.',
    imageUrl: 'https://picsum.photos/600/400?random=33'
  }
];

export const galleryImages: GalleryImage[] = [
  { id: '1', src: 'https://picsum.photos/800/600?random=41', alt: 'Church congregation during service' },
  { id: '2', src: 'https://picsum.photos/800/600?random=42', alt: 'Church choir singing joyfully' },
  { id: '3', src: 'https://picsum.photos/800/600?random=43', alt: 'Pastor delivering a sermon' },
  { id: '4', src: 'https://picsum.photos/800/600?random=44', alt: 'Community outreach event' },
  { id: '5', src: 'https://picsum.photos/800/600?random=45', alt: 'Youth group activity' },
  { id: '6', src: 'https://picsum.photos/800/600?random=46', alt: 'Church building exterior' },
  { id: '7', src: 'https://picsum.photos/800/600?random=47', alt: 'Volunteers helping in the community' },
  { id: '8', src: 'https://picsum.photos/800/600?random=48', alt: 'Children\'s Sunday school class' },
  { id: '9', src: 'https://picsum.photos/800/600?random=49', alt: 'Annual church picnic' },
];

export const communityPosts: Post[] = [
  {
    id: 'testimony-1',
    name: 'Grace J.',
    type: 'Testimony',
    message: 'I want to thank God for His healing power. I was unwell last week, but after the prayers from the church family, I am feeling completely restored. Praise the Lord!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    interactions: 15,
  },
  {
    id: 'prayer-1',
    name: 'Anonymous',
    type: 'Prayer',
    message: 'Please pray for my upcoming job interview this Friday. I am trusting God for favor and for His will to be done.',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    interactions: 22,
  },
  {
    id: 'testimony-2',
    name: 'David & Sarah',
    type: 'Testimony',
    message: 'We are overjoyed to share that we are expecting our first child! We have been praying for this for a long time and we are so grateful for this miracle.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    interactions: 48,
  },
    {
    id: 'prayer-2',
    name: 'John A.',
    type: 'Prayer',
    message: 'Requesting prayers for my mother who is scheduled for surgery next week. Please pray for the hands of the surgeons and for a quick and successful recovery.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    interactions: 35,
  }
];