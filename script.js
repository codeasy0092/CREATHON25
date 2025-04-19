<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        // Show loader initially
        document.getElementById('loader').classList.add('active');

        // Simulate loading content
        setTimeout(() => {
            document.getElementById('loader').classList.remove('active');
        }, 1500);

        // Historical Data - Sample for 5 major periods with high-quality images
        const historicalPeriods = [
            {
                id: 'indus',
                name: 'Indus Valley Civilization',
                startYear: -3300,
                endYear: -1300,
                color: '#8D6E63',
                rulers: ['Various city-state rulers'],
                achievements: [
                    'Urban planning with grid layouts',
                    'Advanced drainage systems',
                    'Standardized weights and measures',
                    'Indus script (undeciphered)',
                    'Pottery and craft specialization',
                    'Extensive trade networks'
                ],
                territory: 'Northwest India and Pakistan',
                description: 'One of the world\'s earliest urban civilizations, known for its sophisticated city planning, craft specialization, and trade networks that extended to Mesopotamia.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mohenjo-daro.jpg/1280px-Mohenjo-daro.jpg',
                headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dancing_Girl_of_Mohenjo-daro.jpg/1280px-Dancing_Girl_of_Mohenjo-daro.jpg',
                shortDesc: 'Bronze Age civilization known for advanced urban planning'
            },
            {
                id: 'maurya',
                name: 'Maurya Empire',
                startYear: -322,
                endYear: -185,
                color: '#5D4037',
                rulers: ['Chandragupta Maurya', 'Bindusara', 'Ashoka the Great'],
                achievements: [
                    'First pan-Indian empire',
                    'Spread of Buddhism under Ashoka',
                    'Advanced administrative system',
                    'Construction of stupas and pillars',
                    'Extensive road network',
                    'Diplomatic relations with Hellenistic kingdoms'
                ],
                territory: 'Most of the Indian subcontinent',
                description: 'The first empire to unify most of the Indian subcontinent, known for its efficient administration and Ashoka\'s conversion to Buddhism after the Kalinga War.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ashoka%27s_visit_to_the_Ramagrama_stupa_Sanchi_Stupa_1_Southern_gateway.jpg/1280px-Ashoka%27s_visit_to_the_Ramagrama_stupa_Sanchi_Stupa_1_Southern_gateway.jpg',
                headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ashoka_Pillar_at_Vaishali%2C_Bihar%2C_India.jpg/1280px-Ashoka_Pillar_at_Vaishali%2C_Bihar%2C_India.jpg',
                shortDesc: 'First pan-Indian empire that spread Buddhism across Asia'
            },
            {
                id: 'gupta',
                name: 'Gupta Empire',
                startYear: 320,
                endYear: 550,
                color: '#FFA000',
                rulers: ['Chandragupta I', 'Samudragupta', 'Chandragupta II', 'Kumaragupta I', 'Skandagupta'],
                achievements: [
                    'Golden Age of India',
                    'Advancements in science, mathematics, and astronomy',
                    'Development of Sanskrit literature',
                    'Construction of temples and universities',
                    'Decimal system and concept of zero',
                    'Classical Indian art and architecture'
                ],
                territory: 'Northern and Central India',
                description: 'Known as the Golden Age of India, this period saw remarkable achievements in arts, science, and literature, including the works of Kalidasa and Aryabhata\'s astronomical discoveries.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gupta_Empire_4th_century_CE.png/1280px-Gupta_Empire_4th_century_CE.png',
                headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Gupta_coinage.jpg/1280px-Gupta_coinage.jpg',
                shortDesc: 'Golden Age with breakthroughs in science and arts'
            },
            {
                id: 'mughal',
                name: 'Mughal Empire',
                startYear: 1526,
                endYear: 1857,
                color: '#388E3C',
                rulers: ['Babur', 'Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'],
                achievements: [
                    'Synthesis of Persian and Indian cultures',
                    'Architectural marvels like Taj Mahal',
                    'Development of Mughlai cuisine',
                    'Land revenue system',
                    'Miniature painting tradition',
                    'Establishment of Urdu language'
                ],
                territory: 'Most of the Indian subcontinent',
                description: 'One of the most powerful empires in Indian history, known for its rich cultural legacy, architectural achievements, and the establishment of a centralized administration system.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1280px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
                headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Akbar%27s_Dream_1605.jpg/1280px-Akbar%27s_Dream_1605.jpg',
                shortDesc: 'Era of cultural synthesis and architectural wonders'
            },
            {
                id: 'british',
                name: 'British Raj',
                startYear: 1858,
                endYear: 1947,
                color: '#D32F2F',
                rulers: ['Queen Victoria', 'British Viceroys'],
                achievements: [
                    'Railway network development',
                    'Modern education system',
                    'Administrative unification',
                    'Indian independence movement',
                    'Introduction of tea cultivation',
                    'Establishment of modern industries'
                ],
                territory: 'Indian subcontinent',
                description: 'The period of British colonial rule in India, marked by economic exploitation but also the rise of nationalist movements that eventually led to India\'s independence in 1947.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Indian_railways.jpg/1280px-Indian_railways.jpg',
                headerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Siege_of_Delhi_1857.jpg/1280px-Siege_of_Delhi_1857.jpg',
                shortDesc: 'Colonial period that shaped modern India'
            }
        ];

        // Sample events data with high-quality images
        const historicalEvents = [
            {
                id: 'event1',
                title: 'Development of Indus Valley Cities',
                date: '2600 BCE',
                period: 'indus',
                type: 'cultural',
                description: 'The mature phase of the Indus Valley Civilization begins, with well-planned cities like Mohenjo-Daro and Harappa featuring advanced drainage systems, public baths, and uniform brick sizes.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mohenjo-daro.jpg/1280px-Mohenjo-daro.jpg',
                link: 'https://en.wikipedia.org/wiki/Indus_Valley_Civilization'
            },
            {
                id: 'event2',
                title: 'Ashoka Converts to Buddhism',
                date: '263 BCE',
                period: 'maurya',
                type: 'religious',
                description: 'After the bloody Kalinga war that resulted in massive casualties, Emperor Ashoka embraces Buddhism and begins spreading its teachings through edicts and missionaries sent across Asia.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ashoka%27s_visit_to_the_Ramagrama_stupa_Sanchi_Stupa_1_Southern_gateway.jpg/1280px-Ashoka%27s_visit_to_the_Ramagrama_stupa_Sanchi_Stupa_1_Southern_gateway.jpg',
                link: 'https://en.wikipedia.org/wiki/Ashoka'
            },
            {
                id: 'event3',
                title: 'Aryabhata Writes Aryabhatiya',
                date: '499 CE',
                period: 'gupta',
                type: 'cultural',
                description: 'The mathematician and astronomer Aryabhata composes his seminal work Aryabhatiya, making significant advances in mathematics and astronomy including approximation of π and explanation of eclipses.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Aryabhata-5_-_Yavanika_2016_%2826%29.jpg/1280px-Aryabhata-5_-_Yavanika_2016_%2826%29.jpg',
                link: 'https://en.wikipedia.org/wiki/Aryabhata'
            },
            {
                id: 'event4',
                title: 'Construction of Taj Mahal',
                date: '1632-1653',
                period: 'mughal',
                type: 'cultural',
                description: 'Mughal emperor Shah Jahan builds the Taj Mahal as a mausoleum for his wife Mumtaz Mahal, employing 20,000 artisans and becoming one of the most iconic examples of Mughal architecture.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1280px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
                link: 'https://en.wikipedia.org/wiki/Taj_Mahal'
            },
            {
                id: 'event5',
                title: 'First War of Indian Independence',
                date: '1857',
                period: 'british',
                type: 'military',
                description: 'A major uprising against British rule begins with sepoy mutinies, marking the beginning of the organized Indian independence movement and leading to the end of East India Company rule.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Siege_of_Delhi_1857.jpg/1280px-Siege_of_Delhi_1857.jpg',
                link: 'https://en.wikipedia.org/wiki/Indian_Rebellion_of_1857'
            },
            {
                id: 'event6',
                title: 'Development of Sanskrit Literature',
                date: '400-600 CE',
                period: 'gupta',
                type: 'cultural',
                description: 'Flourishing of Sanskrit literature including works by Kalidasa like Abhijnanasakuntalam and Meghaduta, establishing classical standards in poetry and drama.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Raja_Ravi_Varma%2C_Shakuntala%2C_1870.jpg/1280px-Raja_Ravi_Varma%2C_Shakuntala%2C_1870.jpg',
                link: 'https://en.wikipedia.org/wiki/Sanskrit_literature'
            },
            {
                id: 'event7',
                title: 'Akbar Establishes Din-i-Ilahi',
                date: '1582',
                period: 'mughal',
                type: 'religious',
                description: 'Emperor Akbar establishes Din-i-Ilahi, a syncretic religion combining elements of Islam, Hinduism, Zoroastrianism, and Christianity, reflecting his policy of religious tolerance.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Akbar%27s_Dream_1605.jpg/1280px-Akbar%27s_Dream_1605.jpg',
                link: 'https://en.wikipedia.org/wiki/Din-i_Ilahi'
            },
            {
                id: 'event8',
                title: 'Construction of Qutub Minar',
                date: '1199-1220',
                period: 'mughal',
                type: 'cultural',
                description: 'Construction of the Qutub Minar begins under Qutb ud-Din Aibak, marking the beginning of Indo-Islamic architecture in India.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Qutb_minar.jpg/1280px-Qutb_minar.jpg',
                link: 'https://en.wikipedia.org/wiki/Qutb_Minar'
            },
            {
                id: 'event9',
                title: 'Chola Naval Expeditions',
                date: '1014-1044',
                period: 'gupta',
                type: 'military',
                description: 'Under Rajendra Chola I, the Chola navy conducts expeditions to Southeast Asia, establishing trade links and cultural exchange.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Brihadeeswarar_Temple_Thanjavur.jpg/1280px-Brihadeeswarar_Temple_Thanjavur.jpg',
                link: 'https://en.wikipedia.org/wiki/Chola_dynasty'
            }
        ];

        // Sample map data (simplified)
        const mapData = {
            borders: {
                indus: [[30, 70], [25, 75], [20, 72], [25, 68], [30, 70]],
                maurya: [[35, 75], [15, 80], [10, 75], [15, 70], [35, 65], [35, 75]],
                gupta: [[35, 75], [20, 80], [15, 75], [20, 70], [35, 65], [35, 75]],
                mughal: [[35, 75], [20, 80], [10, 75], [15, 65], [35, 60], [35, 75]],
                british: [[35, 75], [5, 80], [5, 65], [35, 60], [35, 75]]
            },
            battles: [
                { name: 'Battle of Hydaspes', period: 'maurya', coords: [32.8, 73.5], year: '326 BCE', description: 'Alexander the Great vs. King Porus' },
                { name: 'Battle of Plassey', period: 'british', coords: [23.8, 88.25], year: '1757', description: 'British East India Company vs. Nawab of Bengal' },
                { name: 'Battle of Panipat (1st)', period: 'mughal', coords: [29.39, 76.97], year: '1526', description: 'Babur vs. Ibrahim Lodi' },
                { name: 'Battle of Talikota', period: 'mughal', coords: [16.5, 76.8], year: '1565', description: 'Deccan Sultanates vs. Vijayanagara Empire' },
                { name: 'Battle of Buxar', period: 'british', coords: [25.55, 84.1], year: '1764', description: 'British vs. Mughal Emperor Shah Alam II' }
            ],
            trade: {
                indus: [[25, 68], [25, 60], [30, 55], [35, 50]],
                maurya: [[25, 75], [20, 80], [15, 85], [10, 90]],
                gupta: [[25, 75], [20, 80], [15, 85], [10, 90], [25, 75], [30, 80], [35, 85]],
                mughal: [[25, 75], [20, 80], [15, 85], [10, 90], [25, 75], [30, 80], [35, 85], [40, 90]],
                british: [[25, 75], [20, 80], [15, 85], [10, 90], [25, 75], [30, 80], [35, 85], [40, 90], [45, 95]]
            }
        };

        // DOM Elements
        const timelineScroll = document.getElementById('timelineScroll');
        const periodCards = document.getElementById('periodCards');
        const eventsGrid = document.getElementById('eventsGrid');
        const eraSelect = document.getElementById('eraSelect');
        const eventEraFilter = document.getElementById('eventEraFilter');
        const eventTypeFilter = document.getElementById('eventTypeFilter');
        const eventSearch = document.getElementById('eventSearch');
        const compareBtn = document.getElementById('compareBtn');
        const comparisonModal = document.getElementById('comparisonModal');
        const closeModal = document.querySelector('.close-modal');
        const comparePeriod1 = document.getElementById('comparePeriod1');
        const comparePeriod2 = document.getElementById('comparePeriod2');
        const compareSubmit = document.getElementById('compareSubmit');
        const comparisonResults = document.getElementById('comparisonResults');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const timelineTooltip = document.getElementById('timelineTooltip');

        // Initialize the map
        const historyMap = L.map('history-map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(historyMap);

        // Map layers
        const borderLayers = {};
        const battleMarkers = {};
        const tradeRouteLayers = {};
        let currentLayer = 'borders';

        // Initialize the application
        function init() {
            renderTimeline();
            renderPeriodCards();
            renderEvents();
            setupMap();
            setupEventListeners();
            populateEraSelects();
            
            // Show first timeline item as active by default
            const firstTimelineItem = document.querySelector('.timeline-item');
            if (firstTimelineItem) {
                firstTimelineItem.classList.add('active');
            }
        }

        // Render the interactive timeline
        function renderTimeline() {
            historicalPeriods.forEach(period => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.style.borderTopColor = period.color;
                timelineItem.dataset.periodId = period.id;
                timelineItem.setAttribute('aria-label', `${period.name} (${Math.abs(period.startYear)} ${period.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period.endYear)} ${period.endYear < 0 ? 'BCE' : 'CE'})`);
                
                const periodName = document.createElement('div');
                periodName.className = 'timeline-period';
                periodName.textContent = period.name;
                
                const years = document.createElement('div');
                years.className = 'timeline-years';
                years.textContent = `${Math.abs(period.startYear)} ${period.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period.endYear)} ${period.endYear < 0 ? 'BCE' : 'CE'}`;
                
                timelineItem.appendChild(periodName);
                timelineItem.appendChild(years);
                timelineScroll.appendChild(timelineItem);
                
                // Add hover effect for tooltip
                timelineItem.addEventListener('mouseenter', (e) => {
                    const rect = timelineItem.getBoundingClientRect();
                    timelineTooltip.style.left = `${rect.left + rect.width/2}px`;
                    timelineTooltip.style.top = `${rect.top - 50}px`;
                    timelineTooltip.style.transform = 'translateX(-50%)';
                    timelineTooltip.textContent = period.shortDesc;
                    timelineTooltip.style.opacity = '1';
                });
                
                timelineItem.addEventListener('mouseleave', () => {
                    timelineTooltip.style.opacity = '0';
                });
                
                // Add click event to scroll to period
                timelineItem.addEventListener('click', () => {
                    document.querySelector(`.period-card[data-period-id="${period.id}"]`).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    document.querySelectorAll('.timeline-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    timelineItem.classList.add('active');
                    
                    // Add pulse animation
                    timelineItem.style.animation = 'none';
                    void timelineItem.offsetWidth; // Trigger reflow
                    timelineItem.style.animation = 'pulse 0.5s';
                });
            });
        }

        // Render period cards
        function renderPeriodCards() {
            historicalPeriods.forEach(period => {
                const card = document.createElement('div');
                card.className = 'period-card';
                card.dataset.periodId = period.id;
                
                // Card header with background image
                const cardHeader = document.createElement('div');
                cardHeader.className = 'card-header';
                cardHeader.style.backgroundColor = period.color;
                cardHeader.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${period.headerImage}')`;
                
                const cardTitle = document.createElement('h3');
                cardTitle.className = 'card-title';
                cardTitle.textContent = period.name;
                
                const cardYears = document.createElement('div');
                cardYears.className = 'card-years';
                cardYears.textContent = `${Math.abs(period.startYear)} ${period.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period.endYear)} ${period.endYear < 0 ? 'BCE' : 'CE'}`;
                
                cardHeader.appendChild(cardTitle);
                cardHeader.appendChild(cardYears);
                
                // Card body
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                
                const cardRulers = document.createElement('div');
                cardRulers.className = 'card-rulers';
                cardRulers.innerHTML = `<strong>Key Rulers:</strong> `;
                
                period.rulers.forEach((ruler, index) => {
                    const rulerSpan = document.createElement('span');
                    rulerSpan.textContent = ruler;
                    cardRulers.appendChild(rulerSpan);
                    if (index < period.rulers.length - 1) {
                        cardRulers.appendChild(document.createTextNode(', '));
                    }
                });
                
                const cardAchievements = document.createElement('div');
                cardAchievements.className = 'card-achievements';
                cardAchievements.innerHTML = `<strong>Achievements:</strong>`;
                
                const achievementsList = document.createElement('ul');
                period.achievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.textContent = achievement;
                    achievementsList.appendChild(li);
                });
                
                cardAchievements.appendChild(achievementsList);
                
                const cardMap = document.createElement('div');
                cardMap.className = 'card-map';
                cardMap.id = `map-${period.id}`;
                
                cardBody.appendChild(cardRulers);
                cardBody.appendChild(cardAchievements);
                cardBody.appendChild(cardMap);
                
                // Assemble card
                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                
                periodCards.appendChild(card);
                
                // Initialize mini map for each period
                initMiniMap(period.id, period.name);
                
                // Add hover effect to cards
                card.addEventListener('mouseenter', () => {
                    const timelineItem = document.querySelector(`.timeline-item[data-period-id="${period.id}"]`);
                    if (timelineItem) {
                        timelineItem.style.transform = 'translateY(-10px)';
                        timelineItem.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    const timelineItem = document.querySelector(`.timeline-item[data-period-id="${period.id}"]`);
                    if (timelineItem && !timelineItem.classList.contains('active')) {
                        timelineItem.style.transform = '';
                        timelineItem.style.boxShadow = '';
                    }
                });
            });
        }

        // Initialize mini maps for period cards
        function initMiniMap(periodId, periodName) {
            const miniMap = L.map(`map-${periodId}`, {
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                doubleClickZoom: false,
                scrollWheelZoom: false,
                boxZoom: false,
                tap: false
            }).setView([20.5937, 78.9629], 4);
            
            // Add a simple base layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
            
            // Add territory outline (simplified)
            const bounds = mapData.borders[periodId].map(coord => L.latLng(coord[0], coord[1]));
            L.polygon(bounds, {
                color: historicalPeriods.find(p => p.id === periodId).color,
                fillOpacity: 0.3,
                weight: 2
            }).addTo(miniMap);
            
            // Disable all interaction
            miniMap.touchZoom.disable();
            miniMap.doubleClickZoom.disable();
            miniMap.scrollWheelZoom.disable();
            miniMap.boxZoom.disable();
            miniMap.keyboard.disable();
        }

        // Render historical events
        function renderEvents(filteredEvents = historicalEvents) {
            eventsGrid.innerHTML = '';
            
            filteredEvents.forEach(event => {
                const period = historicalPeriods.find(p => p.id === event.period);
                
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.dataset.eventId = event.id;
                eventCard.dataset.period = event.period;
                eventCard.dataset.type = event.type;
                
                const eventImageContainer = document.createElement('div');
                eventImageContainer.className = 'event-image-container';
                
                const eventImage = document.createElement('img');
                eventImage.className = 'event-image';
                eventImage.src = event.image;
                eventImage.alt = event.title;
                eventImage.loading = "lazy";
                
                const eventPeriod = document.createElement('div');
                eventPeriod.className = 'event-period';
                eventPeriod.textContent = period.name;
                eventPeriod.style.backgroundColor = period.color;
                
                eventImageContainer.appendChild(eventImage);
                eventImageContainer.appendChild(eventPeriod);
                
                const eventContent = document.createElement('div');
                eventContent.className = 'event-content';
                
                const eventDate = document.createElement('div');
                eventDate.className = 'event-date';
                eventDate.textContent = event.date;
                
                const eventTitle = document.createElement('h3');
                eventTitle.className = 'event-title';
                eventTitle.textContent = event.title;
                
                const eventDesc = document.createElement('p');
                eventDesc.className = 'event-desc';
                eventDesc.textContent = event.description;
                
                const learnMore = document.createElement('a');
                learnMore.className = 'learn-more';
                learnMore.href = event.link;
                learnMore.textContent = 'Learn More';
                learnMore.target = '_blank';
                learnMore.rel = 'noopener noreferrer';
                learnMore.innerHTML += ' <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                
                eventContent.appendChild(eventDate);
                eventContent.appendChild(eventTitle);
                eventContent.appendChild(eventDesc);
                eventContent.appendChild(learnMore);
                
                eventCard.appendChild(eventImageContainer);
                eventCard.appendChild(eventContent);
                
                eventsGrid.appendChild(eventCard);
            });
        }

        // Set up the main map with layers
        function setupMap() {
            // Create border layers for each period
            historicalPeriods.forEach(period => {
                const bounds = mapData.borders[period.id].map(coord => L.latLng(coord[0], coord[1]));
                borderLayers[period.id] = L.polygon(bounds, {
                    color: period.color,
                    weight: 3,
                    fillOpacity: 0.3,
                    periodId: period.id
                }).bindPopup(`<strong>${period.name}</strong><br>${Math.abs(period.startYear)} ${period.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period.endYear)} ${period.endYear < 0 ? 'BCE' : 'CE'}<br><em>${period.shortDesc}</em>`);
            });
            
            // Create battle markers
            mapData.battles.forEach(battle => {
                const period = historicalPeriods.find(p => p.id === battle.period);
                battleMarkers[battle.name] = L.marker([battle.coords[0], battle.coords[1]], {
                    icon: L.divIcon({
                        className: 'battle-marker',
                        html: '⚔️',
                        iconSize: [30, 30]
                    }),
                    periodId: battle.period
                }).bindPopup(`<strong style="color:${period.color}">${battle.name}</strong><br>${battle.year}<br>${battle.description}`);
            });
            
            // Create trade route layers
            historicalPeriods.forEach(period => {
                const route = mapData.trade[period.id].map(coord => L.latLng(coord[0], coord[1]));
                tradeRouteLayers[period.id] = L.polyline(route, {
                    color: period.color,
                    weight: 4,
                    dashArray: '5, 5',
                    periodId: period.id
                }).bindPopup(`<strong style="color:${period.color}">${period.name} Trade Routes</strong><br>Major trade connections during this period`);
            });
            
            // Show borders by default
            showBorders();
        }

        // Show border layers on map
        function showBorders() {
            clearMap();
            currentLayer = 'borders';
            
            historicalPeriods.forEach(period => {
                borderLayers[period.id].addTo(historyMap);
            });
            
            updateMapControlButtons();
        }

        // Show battle markers on map
        function showBattles() {
            clearMap();
            currentLayer = 'battles';
            
            mapData.battles.forEach(battle => {
                battleMarkers[battle.name].addTo(historyMap);
            });
            
            updateMapControlButtons();
        }

        // Show trade routes on map
        function showTradeRoutes() {
            clearMap();
            currentLayer = 'trade';
            
            historicalPeriods.forEach(period => {
                tradeRouteLayers[period.id].addTo(historyMap);
            });
            
            updateMapControlButtons();
        }

        // Clear all layers from map
        function clearMap() {
            historyMap.eachLayer(layer => {
                if (layer instanceof L.Polygon || layer instanceof L.Marker || layer instanceof L.Polyline) {
                    historyMap.removeLayer(layer);
                }
            });
        }

        // Update active state of map control buttons
        function updateMapControlButtons() {
            document.querySelectorAll('.map-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.layer === currentLayer) {
                    btn.classList.add('active');
                }
            });
        }

        // Filter map by era
        function filterMapByEra(eraId) {
            if (eraId === 'all') {
                // Show all features for current layer
                if (currentLayer === 'borders') {
                    showBorders();
                } else if (currentLayer === 'battles') {
                    showBattles();
                } else if (currentLayer === 'trade') {
                    showTradeRoutes();
                }
            } else {
                // Filter features by era
                clearMap();
                
                if (currentLayer === 'borders') {
                    borderLayers[eraId].addTo(historyMap);
                } else if (currentLayer === 'battles') {
                    mapData.battles.forEach(battle => {
                        if (battle.period === eraId) {
                            battleMarkers[battle.name].addTo(historyMap);
                        }
                    });
                } else if (currentLayer === 'trade') {
                    tradeRouteLayers[eraId].addTo(historyMap);
                }
            }
        }

        // Populate era select dropdowns
        function populateEraSelects() {
            // Clear existing options
            eraSelect.innerHTML = '<option value="all">All Eras</option>';
            eventEraFilter.innerHTML = '<option value="all">All Periods</option>';
            comparePeriod1.innerHTML = '';
            comparePeriod2.innerHTML = '';
            
            // Add options for each historical period
            historicalPeriods.forEach(period => {
                const option1 = document.createElement('option');
                option1.value = period.id;
                option1.textContent = period.name;
                eraSelect.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = period.id;
                option2.textContent = period.name;
                eventEraFilter.appendChild(option2);
                
                const option3 = document.createElement('option');
                option3.value = period.id;
                option3.textContent = period.name;
                comparePeriod1.appendChild(option3);
                
                const option4 = document.createElement('option');
                option4.value = period.id;
                option4.textContent = period.name;
                comparePeriod2.appendChild(option4);
            });
            
            // Set different default values for comparison selects
            if (historicalPeriods.length >= 2) {
                comparePeriod1.value = historicalPeriods[0].id;
                comparePeriod2.value = historicalPeriods[1].id;
            }
        }

        // Filter events based on selected filters
        function filterEvents() {
            const eraFilter = eventEraFilter.value;
            const typeFilter = eventTypeFilter.value;
            const searchQuery = eventSearch.value.toLowerCase();
            
            const filtered = historicalEvents.filter(event => {
                // Filter by era
                if (eraFilter !== 'all' && event.period !== eraFilter) {
                    return false;
                }
                
                // Filter by type
                if (typeFilter !== 'all' && event.type !== typeFilter) {
                    return false;
                }
                
                // Filter by search query
                if (searchQuery && 
                    !event.title.toLowerCase().includes(searchQuery) && 
                    !event.description.toLowerCase().includes(searchQuery) &&
                    !event.date.toLowerCase().includes(searchQuery)) {
                    return false;
                }
                
                return true;
            });
            
            renderEvents(filtered);
            
            // Show message if no events found
            if (filtered.length === 0) {
                eventsGrid.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:2rem;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.5;">
                        <path d="M3 3L21 21M10.584 10.587L12 12M12 12L13.414 13.413M12 12L10.584 13.413M12 12L13.414 10.587M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z" stroke="var(--indigo)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3 style="color:var(--indigo); margin-top:1rem;">No events found matching your criteria</h3>
                    <p>Try adjusting your filters or search term</p>
                </div>`;
            }
        }

        // Compare two historical periods
        function comparePeriods(period1Id, period2Id) {
            const period1 = historicalPeriods.find(p => p.id === period1Id);
            const period2 = historicalPeriods.find(p => p.id === period2Id);
            
            comparisonResults.innerHTML = '';
            
            // Create comparison cards
            const card1 = document.createElement('div');
            card1.className = 'comparison-card';
            card1.innerHTML = `
                <h4 class="comparison-title" style="color: ${period1.color}">${period1.name}</h4>
                <div class="comparison-feature">
                    <strong>Duration:</strong> ${Math.abs(period1.startYear)} ${period1.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period1.endYear)} ${period1.endYear < 0 ? 'BCE' : 'CE'}
                </div>
                <div class="comparison-feature">
                    <strong>Key Rulers:</strong> ${period1.rulers.join(', ')}
                </div>
                <div class="comparison-feature">
                    <strong>Territory:</strong> ${period1.territory}
                </div>
                <div class="comparison-feature">
                    <strong>Achievements:</strong>
                    <ul>
                        ${period1.achievements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <div class="comparison-feature">
                    <strong>Legacy:</strong> ${period1.shortDesc}
                </div>
            `;
            
            const card2 = document.createElement('div');
            card2.className = 'comparison-card';
            card2.innerHTML = `
                <h4 class="comparison-title" style="color: ${period2.color}">${period2.name}</h4>
                <div class="comparison-feature">
                    <strong>Duration:</strong> ${Math.abs(period2.startYear)} ${period2.startYear < 0 ? 'BCE' : 'CE'} - ${Math.abs(period2.endYear)} ${period2.endYear < 0 ? 'BCE' : 'CE'}
                </div>
                <div class="comparison-feature">
                    <strong>Key Rulers:</strong> ${period2.rulers.join(', ')}
                </div>
                <div class="comparison-feature">
                    <strong>Territory:</strong> ${period2.territory}
                </div>
                <div class="comparison-feature">
                    <strong>Achievements:</strong>
                    <ul>
                        ${period2.achievements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <div class="comparison-feature">
                    <strong>Legacy:</strong> ${period2.shortDesc}
                </div>
            `;
            
            comparisonResults.appendChild(card1);
            comparisonResults.appendChild(card2);
            
            // Add animation to comparison cards
            card1.style.animation = 'fadeInUp 0.5s ease-out';
            card2.style.animation = 'fadeInUp 0.5s ease-out 0.2s';
            card1.style.opacity = '1';
            card2.style.opacity = '0';
            setTimeout(() => {
                card2.style.opacity = '1';
            }, 200);
        }

        // Set up event listeners
        function setupEventListeners() {
            // Map control buttons
            document.querySelectorAll('.map-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.layer === 'borders') {
                        showBorders();
                    } else if (btn.dataset.layer === 'battles') {
                        showBattles();
                    } else if (btn.dataset.layer === 'trade') {
                        showTradeRoutes();
                    }
                });
            });
            
            // Era filter for map
            eraSelect.addEventListener('change', () => {
                filterMapByEra(eraSelect.value);
            });
            
            // Event filters
            eventEraFilter.addEventListener('change', filterEvents);
            eventTypeFilter.addEventListener('change', filterEvents);
            eventSearch.addEventListener('input', filterEvents);
            
            // Comparison modal
            compareBtn.addEventListener('click', () => {
                comparisonModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '15px'; // Prevent content shift from scrollbar
            });
            
            closeModal.addEventListener('click', () => {
                comparisonModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = '';
            });
            
            compareSubmit.addEventListener('click', () => {
                comparePeriods(comparePeriod1.value, comparePeriod2.value);
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === comparisonModal) {
                    comparisonModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = '';
                }
            });
            
            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', () => {
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Close mobile menu if open
                        if (navMenu.classList.contains('active')) {
                            mobileMenuBtn.setAttribute('aria-expanded', 'false');
                            navMenu.classList.remove('active');
                        }
                    }
                });
            });
            
            // Add keyboard navigation to timeline
            timelineScroll.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const scrollAmount = e.key === 'ArrowLeft' ? -200 : 200;
                    timelineScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
    </script>