-- Insert topics for all subjects

-- AGRICULTURE
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Introduction to agriculture',
  '2. Farm tools, implements and equipment',
  '3. Soil science',
  '4. Vegetable growing',
  '5. Root and stem tuber growing OR Legume and oil seed growing',
  '6. Domestic animal rearing',
  '7. Perennial crop production',
  '8. Cattle production',
  '9. Livestock feed making',
  '10. Financial services and money in agriculture',
  '11. Farm buildings and farm structures',
  '12. Processing domestic milk products',
  '13. Processing domestic meat products',
  '14. Biotechnology and Bio safety in agriculture',
  '15. Land tenure system',
  '16. Cooperatives and self help groups',
  '17. Agro wastes and by-products manufacturing'
]) FROM public.subjects WHERE name = 'Agriculture';

-- CHEMISTRY
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Chemistry and Society',
  '2. Experimental Chemistry',
  '3. States and changes of states of matter',
  '4. Using materials',
  '5. Temporary and permanent changes',
  '6. Mixtures, Elements, and compounds',
  '7. Air',
  '8. Water',
  '9. Rocks and Minerals',
  '10. Acids and alkalis',
  '11. Salts',
  '12. The Periodic Table',
  '13. Carbon in the Environment',
  '14. The Reactivity Series',
  '15. Carbon in Life',
  '16. Structures and Bonds',
  '17. Formulae, Stoichiometry and mole concept',
  '18. Properties and Structures of Substances',
  '19. Fossil Fuels',
  '20. Chemical reactions',
  '21. Oxidation and Reduction Reactions',
  '22. Industrial Processes',
  '23. Trends in the Periodic Table',
  '24. Energy Changes during Chemical Reactions',
  '25. Chemical for Consumers',
  '26. Nuclear Processes'
]) FROM public.subjects WHERE name = 'Chemistry';

-- ENGLISH
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Personal life and family',
  '2. Finding Information',
  '3. Food',
  '4. At the market',
  '5. Children at Work',
  '6. Environment and Pollution',
  '7. Urban and rural life',
  '8. Travel',
  '9. Experience of secondary school',
  '10. Modern Communication Technology',
  '11. Celebrations',
  '12. Parents and Children',
  '13. Anti-corruption',
  '14. Human rights, gender and responsibilities',
  '15. Tourism, Maps and Giving Directions',
  '16. Tourism (continued)',
  '17. Leisure',
  '18. Appearance and grooming',
  '19. Childhood memories',
  '20. School clubs',
  '21. Integrity',
  '22. Identity crisis',
  '23. Relationships and emotions',
  '24. Patriotism',
  '25. Further Education',
  '26. Banking and money',
  '27. Leadership',
  '28. The media',
  '29. Culture',
  '30. Choosing a career',
  '31. Applying for a job',
  '32. Globalisation'
]) FROM public.subjects WHERE name = 'English';

-- ENTREPRENEURSHIP
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Introduction to Entrepreneurship Education',
  '2. Businesses in Uganda',
  '3. Business Ideas and Business Opportunities',
  '4. Business Start-up Process',
  '5. Introduction to Government Revenue',
  '6. Legal Forms of Business Ownership',
  '7. Production in Business',
  '8. Marketing in Small Business Enterprise',
  '9. Money and Financial Institutions',
  '10. Taxation',
  '11. Business Planning',
  '12. Introduction to Principles of Accounting',
  '13. Tax Administration',
  '14. Insurance',
  '15. International Trade',
  '16. Tax Compliance'
]) FROM public.subjects WHERE name = 'Entrepreneurship';

-- LITERATURE
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Oral Literature',
  '2. Poetry',
  '3. Drama',
  '4. Prose'
]) FROM public.subjects WHERE name = 'Literature';

-- MATHEMATICS
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Number Bases',
  'Working with Integers',
  'Fractions, Percentages, and Decimals',
  'Rectangular Cartesian Coordinates in 2-dimensions',
  'Geometric Construction Skills',
  'Sequences and Patterns',
  'Bearings',
  'General and Angle Properties of Geometric Figures',
  'Data Collection and Presentation',
  'Reflection',
  'Equations of Lines and Curves',
  'Algebra 1',
  'Business Arithmetic',
  'Time and Timetables',
  'Mappings and Relations',
  'Vectors and Translation',
  'Graphs',
  'Numerical Concepts 1 (Indices and Logarithms)',
  'Inequalities and Regions',
  'Algebra 2',
  'Similarities and Enlargement',
  'Circle',
  'Rotation',
  'Length and Area Properties of Two-Dimensional Geometric Figures',
  'Nets, Areas, and Volume of Solids',
  'Numerical Concepts 2 (Indices, Logarithms, and Surds)',
  'Set Theory',
  'Equation of a Straight Line',
  'Trigonometry 1',
  'Data Collection and Display',
  'Vectors',
  'Ratios and Proportions',
  'Business Mathematics',
  'Trigonometry 2',
  'Matrices',
  'Matrix Transformations',
  'Simultaneous Equations',
  'Probability',
  'Quadratic Equations',
  'Circle Properties',
  'Composite Functions',
  'Equations and Inequalities',
  'Linear Programming',
  'Lines and Planes in Three Dimensions'
]) FROM public.subjects WHERE name = 'Mathematics';

-- PHYSICS
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Introduction to Physics',
  'Measurements in Physics',
  'States of matter',
  'Effects of forces',
  'Temperature measurements',
  'Heat transfer',
  'Expansion of solids, liquids, and gases',
  'Nature of light; reflection of light at plane surfaces',
  'Work, energy, and power',
  'Turning effects of forces, centre of gravity, and stability',
  'Pressure in solids and fluids',
  'Mechanical properties of Materials and Hooke''s law',
  'Reflection of light at curved surfaces',
  'Magnets and magnetic fields',
  'Electrostatics',
  'The solar system',
  'Linear and non-linear motion',
  'Refraction, dispersion, and colour',
  'Lenses and optical instruments',
  'General wave properties',
  'Sound waves',
  'Heat quantities and vapours',
  'Stars and galaxies',
  'Satellites and communication',
  'Introduction to current electricity',
  'Voltage, resistance and Ohm''s law',
  'Electromagnetic effects',
  'Electric energy distribution and consumption',
  'Atomic models',
  'Nuclear Processes',
  'Digital electronics'
]) FROM public.subjects WHERE name = 'Physics';

-- GEOGRAPHY
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Introduction',
  'Showing the local Area on a map',
  'Maps and their Uses',
  'Ways of studying Geography',
  'The Earth and its Movements',
  'Weather and the Climate',
  'Location, Size, and Relief Regions of East Africa',
  'Formation of Major landforms and Drainage in East Africa',
  'Climate and Natural Vegetation of East Africa',
  'Climate change in East Africa and the World',
  'Major Climatic zone of the World',
  'Geographical Regions of North America',
  'Development of Agriculture in East Africa',
  'Some Agricultural areas of North America',
  'Mining in East Africa',
  'Development of Manufacturing industries in East Africa',
  'Mining and Manufacturing industries in North America',
  'Sustainable use of Fisheries resources in East Africa',
  'Wildlife Conservation and Tourism in East Africa',
  'Wildlife Conservation, Forests, Fishing And Tourism in North America',
  'Population and Urbanisation in East Africa',
  'Urbanisation in North America (New York)',
  'Transport and Communication in East Africa',
  'Trade within and outside East Africa',
  'Further skills in Map Reading',
  'Location and size of Africa',
  'The Relief Regions and Drainage of Africa',
  'The Climate and Vegetation of Africa',
  'Europe: The Rhine lands; Location, Relief Regions, Drainage and Climate',
  'Introduction to China: Location, Size, Relief Regions, Drainage, and Climate',
  'The Development of Agriculture in Africa',
  'Forests, Forest resources and Forestry in Africa',
  'Irrigation Farming in Africa',
  'Irrigation Farming in China',
  'Agriculture in the Rhine lands: Reclaimed land in Netherlands; Cattle in Switzerland',
  'Tourism in Switzerland',
  'Mineral Resources and Mining in Africa',
  'Industrial Development in Africa',
  'Mining and industrial Development in the Ruhr',
  'Mining and Industrial Development in China',
  'Population and Urbanisation in Africa',
  'Population and Urbanisation in China',
  'Urban areas in Netherlands: Rotterdam',
  'Development of Transport, Communication and Trade in Africa',
  'Trade between Europe especially the Rhine lands and Africa; and between China and Africa'
]) FROM public.subjects WHERE name = 'Geography';

-- HISTORY
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Finding out about our past',
  'The Origin of man',
  'Migration systems into East Africa since 1000AD',
  'State formation in East Africa',
  'External trade contacts to East African communities',
  'Colonization and the scramble of East Africa',
  'Response to the establishment of colonial rule in East Africa',
  'Leadership and culture in our communities',
  'Government administration systems in Uganda',
  'Patriotism and History of Uganda since 1986',
  'Civil society and non-governmental organizations',
  'How do we own land in Uganda',
  'Foreign Religions in East Africa',
  'The colonial Administrative systems in East Africa',
  'The colonial economy in East Africa',
  'Trade systems in West Africa',
  'The 19th Century Islamic Movements in West Africa',
  'National Movements and struggles for independence in West Africa',
  'Regional groups in West Africa: the Economic Organisation of West African States',
  'The Uganda Railway',
  'The Devonshire white paper of 1923 in Kenya',
  'The world war II in East Africa, 1939-1945',
  'Our systems of government',
  'Human Rights',
  'The Uganda crisis of 1967',
  'Leadership of Idi Amin Dada in Uganda',
  'The recent issues in East African History',
  'The East African Community (EAC) and the East African Legislative Assembly',
  'Neo-colonialism in East Africa',
  'Diplomacy and international relations',
  'Globalization and foreign aid',
  'Mineral discovery in South Africa',
  'The Apartheid policy in South Africa',
  'Liberation struggles in South Africa and the career of Nelson Mandela'
]) FROM public.subjects WHERE name = 'History';

-- ICT
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Introduction to ICT',
  'Computer Hardware and System Start up',
  'File and Folder Management',
  'Word Processing I',
  'Spreadsheet I',
  'Electronic Presentation',
  'Information Access and Sharing',
  'Health and Safety',
  'Word Processing II',
  'Spreadsheet II',
  'Electronic Publication',
  'Database Management Systems',
  'Web Design',
  'Electronic Waste Management',
  'System and Data Security'
]) FROM public.subjects WHERE name = 'ICT';

-- CRE (Christian Religious Education)
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  '1. Worship',
  '2. Christian Rituals and Celebrations',
  '3. Values in Christianity, Islam and African Traditional Religion',
  '4. Respect for human life',
  '5. Marriage',
  '6. Family',
  '7. Work',
  '8. Wealth and Development',
  '9. Leisure',
  '10. Peace',
  '11. Justice',
  '12. Conflict resolution'
]) FROM public.subjects WHERE name = 'CRE' OR name LIKE '%Religion%';

-- TECHNOLOGY AND DESIGN
INSERT INTO public.topics (subject_id, name) 
SELECT id, unnest(ARRAY[
  'Introduction to design',
  'The design process',
  'Introduction to drawing',
  'Basic shapes',
  'Tangents to circles',
  'Health, safety, security and environment',
  'Tools',
  'Materials',
  'Making Processes',
  'Enlargement and reproduction',
  'Transformation',
  'Pictorial drawing',
  'Orthographic projections',
  'Mechanical systems',
  'Engineering materials',
  'Loci',
  'Plain and diagonal scales',
  'Further orthographic projections',
  'Building drawing',
  'Mechanical drawing',
  'Material preservation and protection',
  'Materials Joining',
  'Renewable Energy',
  'Sectioning',
  'Surface development of solids',
  'Electricity and electronics',
  'Construction practice',
  'Electronics',
  'Maintenance and repair of simple machines'
]) FROM public.subjects WHERE name LIKE '%Technology%' OR name LIKE '%Design%';
