'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function PairingGuide() {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();

    const recipeDatabase = {
        "Aloo Paratha": {
            en: {
                name: "Aloo Paratha",
                description: "Aloo Paratha is a popular Indian breakfast bread stuffed with spicy, flavorful mashed potatoes, cooked to golden perfection.",
                picklePairingName: "Mewari Mango Pickle",
                pairingReason: "The tanginess of raw mango cuts through the rich, buttery texture of the paratha perfectly.",
                prepTime: "25 Mins",
                difficulty: "Medium",
                spiceLevel: "Low",
                ingredients: "• 2 cups Whole Wheat Flour\n• 3-4 Boiled Potatoes\n• 1 chopped Green Chilli\n• 1 tsp Garam Masala\n• 1/2 tsp Red Chilli Powder\n• Ghee or Butter for roasting",
                instructions: "1. Knead the wheat flour into a soft dough.\n2. Mash the boiled potatoes and mix in all the spices and chillies.\n3. Take a small dough ball, roll it slightly, and place a spoonful of potato filling in the center.\n4. Seal the edges, dust with flour, and roll it out gently into a flat circle.\n5. Roast on a hot tawa (griddle) with ghee until golden brown on both sides.\n6. Serve hot with a generous dollop of butter and your favorite Mewari Achaar!"
            },
            hi: {
                name: "आलू पराठा",
                description: "आलू पराठा एक लोकप्रिय भारतीय नाश्ता है, जिसमें मसालेदार उबले आलू भरकर सुनहरा होने तक सेका जाता है।",
                picklePairingName: "मेवाड़ी आम का अचार",
                pairingReason: "कच्चे आम का तीखापन पराठे के मक्खन वाले स्वाद के साथ एकदम सटीक बैठता है।",
                prepTime: "25 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "कम",
                ingredients: "• 2 कप गेहूं का आटा\n• 3-4 उबले आलू\n• 1 कटी हरी मिर्च\n• 1 चम्मच गरम मसाला\n• 1/2 चम्मच लाल मिर्च पाउडर\n• सेंकने के लिए घी या मक्खन",
                instructions: "1. गेहूं के आटे को नरम गूंध लें।\n2. उबले आलू को मैश करें और सभी मसाले और मिर्च मिला लें।\n3. आटे की छोटी लोई लें, थोड़ा बेलें और बीच में एक चम्मच आलू का मसाला रखें।\n4. किनारों को बंद करें, सूखा आटा लगाएं और हल्के हाथों से गोल बेल लें।\n5. गरम तवे पर दोनों तरफ घी लगाकर सुनहरा होने तक सेकें।\n6. मक्खन और अपने पसंदीदा मेवाड़ी अचार के साथ गरमागरम परोसें!"
            },
            pickleImageResId: "/images/products/mango.jpg"
        },
        "Dal Tadka": {
            en: {
                name: "Dal Tadka",
                description: "A comforting bowl of yellow lentils tempered with ghee, cumin, garlic, and aromatic spices. The heart of every Indian meal.",
                picklePairingName: "Mewari Mango Pickle",
                pairingReason: "A bite of tangy mango pickle brightens up the subtle earthy flavors of the dal.",
                prepTime: "20 Mins",
                difficulty: "Easy",
                spiceLevel: "Low",
                ingredients: "• 1 cup Toor Dal (Yellow Lentils)\n• 2 tbsp Ghee\n• 1 tsp Cumin Seeds\n• 3 cloves Garlic (minced)\n• 1 Onion & 1 Tomato (chopped)\n• 1/2 tsp Turmeric",
                instructions: "1. Pressure cook the dal with turmeric, salt, and water until soft.\n2. Heat ghee in a pan, add cumin seeds and let them splutter.\n3. Add garlic, chopped onions, and sauté until golden.\n4. Add tomatoes and cook until soft and mushy.\n5. Pour this tadka (tempering) over the cooked dal and mix well.\n6. Garnish with fresh coriander and serve with rice and Mewari Achaar."
            },
            hi: {
                name: "दाल तड़का",
                description: "घी, जीरा, लहसुन और खुशबूदार मसालों के तड़के वाली पीली दाल। हर भारतीय भोजन की जान।",
                picklePairingName: "मेवाड़ी आम का अचार",
                pairingReason: "आम के अचार का एक टुकड़ा दाल के साधारण स्वाद को और भी शानदार बना देता है।",
                prepTime: "20 मिनट",
                difficulty: "आसान",
                spiceLevel: "कम",
                ingredients: "• 1 कप अरहर की दाल\n• 2 चम्मच घी\n• 1 चम्मच जीरा\n• 3 कलियां लहसुन (कटा हुआ)\n• 1 प्याज और 1 टमाटर (कटा हुआ)\n• 1/2 चम्मच हल्दी",
                instructions: "1. दाल को हल्दी, नमक और पानी के साथ नरम होने तक प्रेशर कुक करें।\n2. एक पैन में घी गरम करें, जीरा डालें और चटकने दें।\n3. लहसुन और कटा हुआ प्याज डालकर सुनहरा होने तक भूनें।\n4. टमाटर डालें और नरम होने तक पकाएं।\n5. इस तड़के को पकी हुई दाल के ऊपर डालें और अच्छी तरह मिला लें।\n6. ताजे धनिये से सजाकर चावल और मेवाड़ी अचार के साथ परोसें।"
            },
            pickleImageResId: "/images/products/mango.jpg"
        },
        "Mathri": {
            en: {
                name: "Mathri",
                description: "A traditional, flaky, and crispy North Indian snack made with flour and spices like carom seeds (ajwain) and black pepper.",
                picklePairingName: "Mewari Chilli Pickle",
                pairingReason: "The intense spicy kick of the chilli pickle contrasts beautifully with the flaky, dry mathri.",
                prepTime: "40 Mins",
                difficulty: "Medium",
                spiceLevel: "None",
                ingredients: "• 2 cups All-Purpose Flour (Maida)\n• 1 tsp Ajwain (Carom Seeds)\n• 1 tsp Crushed Black Pepper\n• 1/4 cup Ghee (melted)\n• Oil for deep frying",
                instructions: "1. Mix flour, salt, ajwain, black pepper, and melted ghee in a bowl.\n2. Rub the mixture until it resembles breadcrumbs.\n3. Add warm water gradually and knead into a stiff dough.\n4. Let it rest for 20 minutes.\n5. Pinch small balls, flatten them slightly, and prick with a fork so they don't puff up.\n6. Deep fry on low heat until crisp and golden. Cool completely and enjoy with Achaar!"
            },
            hi: {
                name: "मठरी",
                description: "मैदा, अजवाइन और काली मिर्च से बना पारंपरिक, कुरकुरा उत्तर भारतीय स्नैक।",
                picklePairingName: "मेवाड़ी मिर्च का अचार",
                pairingReason: "मिर्च के अचार का तीखा स्वाद सूखी और कुरकुरी मठरी के साथ बहुत बढ़िया लगता है।",
                prepTime: "40 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "नहीं",
                ingredients: "• 2 कप मैदा\n• 1 चम्मच अजवाइन\n• 1 चम्मच कुटी काली मिर्च\n• 1/4 कप पिघला हुआ घी\n• तलने के लिए तेल",
                instructions: "1. एक प्याले में मैदा, नमक, अजवाइन, काली मिर्च और पिघला हुआ घी मिला लें।\n2. मिश्रण को तब तक मलें जब तक वह ब्रेडक्रंब जैसा न हो जाए।\n3. धीरे-धीरे गर्म पानी डालें और सख्त आटा गूंध लें। 20 मिनट के लिए रख दें।\n4. छोटी लोइयां तोड़ें, हल्का चपटा करें और कांटे से छेद करें ताकि वे फूलें नहीं।\n5. धीमी आंच पर सुनहरा होने तक तलें। ठंडा होने पर अचार के साथ आनंद लें!"
            },
            pickleImageResId: "/images/products/chilli.jpg"
        },
        "Chole Bhature": {
            en: {
                name: "Chole Bhature",
                description: "A spicy, tangy chickpea curry served alongside fluffy, deep-fried leavened bread. A true weekend indulgence.",
                picklePairingName: "Mewari Chilli Pickle",
                pairingReason: "A quintessential pairing. The sharp spice of the chilli pickle elevates the robust flavors of the Chole.",
                prepTime: "60 Mins",
                difficulty: "Hard",
                spiceLevel: "High",
                ingredients: "• 1 cup Chickpeas (soaked overnight)\n• 2 Onions & 2 Tomatoes (pureed)\n• Chole Masala & Spices\n• 2 cups Maida (for Bhature)\n• 1/4 cup Yogurt (for dough)",
                instructions: "1. Boil chickpeas until tender.\n2. Cook onion-tomato paste with spices, add chickpeas, and simmer.\n3. Knead maida with yogurt, salt, and a pinch of baking soda into a soft dough; rest for 2 hours.\n4. Roll dough into ovals and deep fry in hot oil until puffed.\n5. Serve piping hot with onions and Mewari Chilli Pickle."
            },
            hi: {
                name: "छोले भटूरे",
                description: "मसालेदार छोले और फूले हुए भटूरे का एक बेहतरीन संयोजन। सप्ताहांत का असली मज़ा।",
                picklePairingName: "मेवाड़ी मिर्च का अचार",
                pairingReason: "मिर्च के अचार का तेज़ तीखापन छोलों के मज़बूत स्वाद को और बढ़ा देता है।",
                prepTime: "60 मिनट",
                difficulty: "कठिन",
                spiceLevel: "ज्यादा",
                ingredients: "• 1 कप छोले (रात भर भीगे हुए)\n• 2 प्याज और 2 टमाटर (पिसे हुए)\n• छोले मसाला और अन्य मसाले\n• 2 कप मैदा (भटूरे के लिए)\n• 1/4 कप दही (आटे के लिए)",
                instructions: "1. छोलों को नरम होने तक उबाल लें।\n2. प्याज-टमाटर के पेस्ट को मसालों के साथ पकाएं, छोले डालें और उबाल लें।\n3. मैदे में दही, नमक और चुटकी भर बेकिंग सोडा डालकर नरम आटा गूंधें; 2 घंटे के लिए रख दें।\n4. आटे को बेलकर गरम तेल में फूलने तक तल लें।\n5. प्याज और मेवाड़ी मिर्च के अचार के साथ गरमागरम परोसें।"
            },
            pickleImageResId: "/images/products/chilli.jpg"
        },
        "Thepla": {
            en: {
                name: "Thepla",
                description: "A soft, flavorful Gujarati flatbread made with whole wheat flour, gram flour, and fresh fenugreek leaves (methi).",
                picklePairingName: "Mewari Sweet Lemon Pickle",
                pairingReason: "The bittersweet methi pairs magically with the sweet, tangy notes of lemon pickle.",
                prepTime: "30 Mins",
                difficulty: "Medium",
                spiceLevel: "Low",
                ingredients: "• 1 cup Whole Wheat Flour\n• 2 tbsp Besan (Gram Flour)\n• 1 cup fresh Methi (Fenugreek) leaves\n• Spices (Turmeric, Chilli, Coriander powder)\n• Oil for roasting",
                instructions: "1. Wash and finely chop the methi leaves.\n2. Mix flours, methi, spices, and a little oil. Knead into a dough using water or yogurt.\n3. Roll into thin circles.\n4. Cook on a hot tawa with oil until brown spots appear on both sides.\n5. Serve with yogurt and Mewari Achaar."
            },
            hi: {
                name: "थेपला",
                description: "गेहूं के आटे, बेसन और ताजी मेथी से बनी एक नरम, स्वादिष्ट गुजराती रोटी।",
                picklePairingName: "मेवाड़ी मीठा नींबू का अचार",
                pairingReason: "मेथी का हल्का कड़वा स्वाद और नींबू के अचार का खट्टा-मीठा स्वाद एक जादू सा लगता है।",
                prepTime: "30 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "कम",
                ingredients: "• 1 कप गेहूं का आटा\n• 2 चम्मच बेसन\n• 1 कप ताजी मेथी की पत्तियां\n• मसाले (हल्दी, मिर्च, धनिया पाउडर)\n• सेकने के लिए तेल",
                instructions: "1. मेथी के पत्तों को धोकर बारीक काट लें।\n2. आटा, बेसन, मेथी, मसाले और थोड़ा तेल मिलाएं। पानी या दही की मदद से आटा गूंध लें।\n3. पतली गोल रोटियां बेल लें।\n4. गरम तवे पर तेल लगाकर दोनों तरफ ब्राउन स्पॉट आने तक सेकें।\n5. दही और मेवाड़ी अचार के साथ परोसें।"
            },
            pickleImageResId: "/images/products/amla.jpg"
        },
        "Bajre Ki Roti": {
            en: {
                name: "Bajre Ki Roti",
                description: "A rustic, gluten-free flatbread from Rajasthan made with pearl millet flour, perfect for winter meals.",
                picklePairingName: "Mewari Garlic Pickle",
                pairingReason: "Garlic pickle adds a punch of pungent heat that perfectly complements the earthy, coarse bajra.",
                prepTime: "20 Mins",
                difficulty: "Hard",
                spiceLevel: "Low",
                ingredients: "• 2 cups Bajra (Pearl Millet) Flour\n• Warm Water\n• Salt to taste\n• Ghee (generous amounts)",
                instructions: "1. Mix bajra flour and salt. Add warm water gradually to knead a soft dough.\n2. Take a portion and flatten it using your palms (or a rolling pin between plastic sheets).\n3. Carefully transfer to a hot tawa.\n4. Cook on medium heat until cooked through, then roast directly on open flame to puff up slightly.\n5. Slather generously with white butter or ghee and serve with Mewari Garlic Pickle."
            },
            hi: {
                name: "बाजरे की रोटी",
                description: "राजस्थान की पारंपरिक बाजरे के आटे से बनी रोटी, सर्दियों के भोजन के लिए उत्तम।",
                picklePairingName: "मेवाड़ी लहसुन का अचार",
                pairingReason: "लहसुन के अचार का तीखापन बाजरे के सादे स्वाद को एक नया अंदाज़ देता है।",
                prepTime: "20 मिनट",
                difficulty: "कठिन",
                spiceLevel: "कम",
                ingredients: "• 2 कप बाजरे का आटा\n• गरम पानी\n• नमक स्वादानुसार\n• ढेर सारा घी",
                instructions: "1. बाजरे का आटा और नमक मिलाएं। गरम पानी डालकर नरम आटा गूंध लें।\n2. आटे की लोई लें और अपनी हथेलियों की मदद से चपटा करें।\n3. सावधानी से गरम तवे पर डालें।\n4. मध्यम आँच पर पकाएँ, फिर सीधे आग पर सेंकें ताकि वह थोड़ी फूल जाए।\n5. सफेद मक्खन या घी लगाकर मेवाड़ी लहसुन के अचार के साथ परोसें।"
            },
            pickleImageResId: "/images/products/garlic.jpg"
        },
        "Dal Baati": {
            en: {
                name: "Dal Baati",
                description: "The crown jewel of Rajasthani cuisine! Hard wheat rolls (Baati) crushed and drowned in ghee, eaten with spicy mixed lentils (Panchmel Dal).",
                picklePairingName: "Mewari Garlic Pickle",
                pairingReason: "Authentic Rajasthani experience. The bold garlic flavor completes the rich, ghee-laden baati.",
                prepTime: "90 Mins",
                difficulty: "Hard",
                spiceLevel: "Medium",
                ingredients: "• 2 cups Coarse Wheat Flour (for Baati)\n• 1/4 cup Ghee (for dough) + more for soaking\n• Panchmel Dal (Mix of 5 lentils)\n• Traditional Rajasthani Spices",
                instructions: "1. Knead a stiff dough for baatis with flour, salt, and ghee. Form round balls.\n2. Bake in a traditional oven (or regular oven/gas tandoor) until cracked and golden brown.\n3. Pressure cook the 5 lentils and prepare a spicy garlic-cumin tadka.\n4. Break the hot baati, pour a generous amount of melted ghee over it.\n5. Serve with the hot dal, chopped onions, and a dollop of Mewari Garlic Pickle."
            },
            hi: {
                name: "दाल बाटी",
                description: "राजस्थानी खाने की शान! कड़क सिकी हुई बाटियाँ घी में डुबोकर, मसालेदार पंचमेल दाल के साथ खाई जाती हैं।",
                picklePairingName: "मेवाड़ी लहसुन का अचार",
                pairingReason: "असली राजस्थानी अनुभव। लहसुन का तेज़ स्वाद घी से भरी बाटी को और भी स्वादिष्ट बनाता है।",
                prepTime: "90 मिनट",
                difficulty: "कठिन",
                spiceLevel: "मध्यम",
                ingredients: "• 2 कप मोटा गेहूं का आटा (बाटी के लिए)\n• 1/4 कप घी (आटे के लिए) + भिगोने के लिए अतिरिक्त\n• पंचमेल दाल (5 दालों का मिश्रण)\n• पारंपरिक राजस्थानी मसाले",
                instructions: "1. आटा, नमक और घी के साथ बाटी के लिए एक सख्त आटा गूंध लें। गोल लोइयां बनाएं।\n2. पारंपरिक ओवन या गैस तंदूर में दरार पड़ने और सुनहरा भूरा होने तक बेक करें।\n3. 5 दालों को प्रेशर कुक करें और लहसुन-जीरे का मसालेदार तड़का तैयार करें।\n4. गरम बाटी को तोड़ें और ऊपर से ढेर सारा पिघला हुआ घी डालें।\n5. गरम दाल, कटे हुए प्याज और मेवाड़ी लहसुन के अचार के साथ परोसें।"
            },
            pickleImageResId: "/images/products/garlic.jpg"
        },
        "Khichdi": {
            en: {
                name: "Khichdi",
                description: "A soothing, one-pot dish of rice and lentils. The ultimate Indian comfort food.",
                picklePairingName: "Mewari Mix Pickle",
                pairingReason: "Mix pickle provides a burst of varied flavors to the simple, comforting taste of khichdi.",
                prepTime: "20 Mins",
                difficulty: "Easy",
                spiceLevel: "Low",
                ingredients: "• 1/2 cup Rice\n• 1/2 cup Moong Dal\n• 1 tbsp Ghee\n• Cumin seeds & Turmeric",
                instructions: "1. Wash and soak rice and dal.\n2. Heat ghee in a cooker, add cumin seeds.\n3. Add rice, dal, water, and turmeric. Pressure cook for 3 whistles.\n4. Serve hot with a spoonful of ghee and Mewari Mix Pickle."
            },
            hi: {
                name: "खिचड़ी",
                description: "चावल और दाल का एक हल्का, स्वादिष्ट व्यंजन। भारतीय आराम का सबसे बढ़िया खाना।",
                picklePairingName: "मेवाड़ी मिक्स अचार",
                pairingReason: "मिक्स अचार खिचड़ी के सादे स्वाद में कई तरह के मसालों का तड़का लगा देता है।",
                prepTime: "20 मिनट",
                difficulty: "आसान",
                spiceLevel: "कम",
                ingredients: "• 1/2 कप चावल\n• 1/2 कप मूंग दाल\n• 1 चम्मच घी\n• जीरा और हल्दी",
                instructions: "1. चावल और दाल को धोकर भिगो दें।\n2. कुकर में घी गरम करें, जीरा डालें।\n3. चावल, दाल, पानी और हल्दी डालें। 3 सीटी आने तक प्रेशर कुक करें।\n4. एक चम्मच घी और मेवाड़ी मिक्स अचार के साथ गरमागरम परोसें।"
            },
            pickleImageResId: "/images/products/mango.jpg"
        },
        "Poha": {
            en: {
                name: "Poha",
                description: "Light, fluffy flattened rice cooked with onions, potatoes, and peanuts. A classic Maharashtrian and MP breakfast.",
                picklePairingName: "Mewari Sweet Lemon Pickle",
                pairingReason: "The sweet and sour profile of the lemon pickle beautifully enhances the mild, savory poha.",
                prepTime: "15 Mins",
                difficulty: "Easy",
                spiceLevel: "Low",
                ingredients: "• 2 cups Thick Poha\n• 1 Onion (chopped)\n• Peanuts & Mustard Seeds\n• Turmeric, Green Chillies",
                instructions: "1. Rinse poha gently and let it soften.\n2. Sauté peanuts, mustard seeds, chillies, and onions in oil.\n3. Add turmeric and salt, then gently mix in the softened poha.\n4. Garnish with coriander and serve with Sweet Lemon Pickle."
            },
            hi: {
                name: "पोहा",
                description: "हल्का और मुलायम चिवड़ा जिसे प्याज, आलू और मूंगफली के साथ पकाया जाता है। एक क्लासिक नाश्ता।",
                picklePairingName: "मेवाड़ी मीठा नींबू का अचार",
                pairingReason: "नींबू के अचार का खट्टा-मीठा स्वाद पोहे के नमकीन स्वाद को और भी बढ़ा देता है।",
                prepTime: "15 मिनट",
                difficulty: "आसान",
                spiceLevel: "कम",
                ingredients: "• 2 कप मोटा पोहा\n• 1 प्याज (कटा हुआ)\n• मूंगफली और राई\n• हल्दी, हरी मिर्च",
                instructions: "1. पोहे को हल्के हाथों से धो लें और नरम होने दें।\n2. तेल में मूंगफली, राई, मिर्च और प्याज भून लें।\n3. हल्दी और नमक डालें, फिर धीरे से नरम पोहा मिला लें।\n4. धनिया से सजाकर मीठे नींबू के अचार के साथ परोसें।"
            },
            pickleImageResId: "/images/products/amla.jpg"
        },
        "Samosa": {
            en: {
                name: "Samosa",
                description: "Crispy, deep-fried pastry filled with a spiced potato and pea mixture. The king of Indian snacks.",
                picklePairingName: "Mewari Chilli Pickle",
                pairingReason: "Samosa demands a spicy kick. The chilli pickle serves as the perfect fiery dip.",
                prepTime: "60 Mins",
                difficulty: "Medium",
                spiceLevel: "High",
                ingredients: "• 2 cups Maida (All Purpose Flour)\n• Boiled Potatoes & Peas\n• Cumin, Coriander, Garam Masala\n• Oil for frying",
                instructions: "1. Make a stiff dough with maida, oil, and water.\n2. Prepare the filling by sautéing mashed potatoes and peas with spices.\n3. Roll out the dough, cut into semi-circles, form cones, and stuff.\n4. Deep fry until golden and crisp."
            },
            hi: {
                name: "समोसा",
                description: "मसालेदार आलू और मटर के मिश्रण से भरी कुरकुरी पेस्ट्री। भारतीय स्नैक्स का राजा।",
                picklePairingName: "मेवाड़ी मिर्च का अचार",
                pairingReason: "समोसे को एक तीखे स्वाद की जरूरत होती है। मिर्च का अचार इसके लिए एकदम सही है।",
                prepTime: "60 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "ज्यादा",
                ingredients: "• 2 कप मैदा\n• उबले आलू और मटर\n• जीरा, धनिया, गरम मसाला\n• तलने के लिए तेल",
                instructions: "1. मैदा, तेल और पानी के साथ सख्त आटा गूंध लें।\n2. उबले आलू और मटर को मसालों के साथ भूनकर भरावन तैयार करें।\n3. आटे को बेलें, अर्धवृत्त (semi-circles) में काटें, कोन बनाएं और भरावन भरें।\n4. सुनहरा और कुरकुरा होने तक तलें।"
            },
            pickleImageResId: "/images/products/chilli.jpg"
        },
        "Rajma Chawal": {
            en: {
                name: "Rajma Chawal",
                description: "Red kidney beans cooked in a thick, rich tomato and onion gravy, served over steaming basmati rice.",
                picklePairingName: "Mewari Mango Pickle",
                pairingReason: "The tanginess of mango pickle beautifully balances the heavy, rich gravy of the Rajma.",
                prepTime: "50 Mins",
                difficulty: "Medium",
                spiceLevel: "Medium",
                ingredients: "• 1 cup Rajma (Kidney Beans)\n• 2 Onions & 3 Tomatoes (pureed)\n• Ginger-Garlic paste\n• Rajma Masala & Basmati Rice",
                instructions: "1. Boil soaked rajma until tender.\n2. Sauté onions, ginger-garlic, and tomato puree with spices until oil separates.\n3. Add boiled rajma and simmer until the gravy thickens.\n4. Serve hot over steamed rice."
            },
            hi: {
                name: "राजमा चावल",
                description: "गाढ़ी टमाटर और प्याज की ग्रेवी में पके राजमा, गरम बासमती चावल के साथ परोसे जाते हैं।",
                picklePairingName: "मेवाड़ी आम का अचार",
                pairingReason: "आम के अचार का खट्टापन राजमा की गाढ़ी ग्रेवी को बहुत अच्छे से संतुलित करता है।",
                prepTime: "50 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "मध्यम",
                ingredients: "• 1 कप राजमा\n• 2 प्याज और 3 टमाटर (प्यूरी)\n• अदरक-लहसुन का पेस्ट\n• राजमा मसाला और बासमती चावल",
                instructions: "1. भीगे हुए राजमा को नरम होने तक उबाल लें।\n2. प्याज, अदरक-लहसुन और टमाटर की प्यूरी को मसालों के साथ तेल अलग होने तक भून लें।\n3. उबले हुए राजमा डालें और ग्रेवी गाढ़ी होने तक पकाएँ।\n4. गरम चावल के ऊपर परोसें।"
            },
            pickleImageResId: "/images/products/mango.jpg"
        },
        "Makki Ki Roti": {
            en: {
                name: "Makki Ki Roti",
                description: "A traditional Punjabi flatbread made from cornmeal, typically enjoyed during winters with Sarson ka Saag.",
                picklePairingName: "Mewari Garlic Pickle",
                pairingReason: "The earthy cornmeal loves the sharp, pungent bite of authentic garlic pickle.",
                prepTime: "30 Mins",
                difficulty: "Hard",
                spiceLevel: "Low",
                ingredients: "• 2 cups Makki (Cornmeal) Flour\n• Warm Water\n• Ghee or White Butter",
                instructions: "1. Knead the makki flour with warm water until it comes together.\n2. Wet your hands and carefully pat a small portion of dough into a flat circle.\n3. Transfer to a hot tawa and cook both sides.\n4. Roast over an open flame until crisp and slather with butter."
            },
            hi: {
                name: "मक्की की रोटी",
                description: "मक्के के आटे से बनी पारंपरिक पंजाबी रोटी, जो आमतौर पर सर्दियों में सरसों के साग के साथ खाई जाती है।",
                picklePairingName: "मेवाड़ी लहसुन का अचार",
                pairingReason: "मक्के के आटे का सीधा-सादा स्वाद और लहसुन के अचार का तेज़ स्वाद एक बेहतरीन संगम है।",
                prepTime: "30 मिनट",
                difficulty: "कठिन",
                spiceLevel: "कम",
                ingredients: "• 2 कप मक्की का आटा\n• गरम पानी\n• घी या सफेद मक्खन",
                instructions: "1. मक्की के आटे को गरम पानी के साथ गूंध लें।\n2. हाथों को गीला करें और आटे के एक छोटे हिस्से को थपथपा कर गोल रोटी का आकार दें।\n3. गरम तवे पर डालें और दोनों तरफ से पकाएँ।\n4. खुली आंच पर कुरकुरा होने तक सेंकें और मक्खन लगाएँ।"
            },
            pickleImageResId: "/images/products/garlic.jpg"
        },
        "Puri Bhaji": {
            en: {
                name: "Puri Bhaji",
                description: "Fluffy, deep-fried wheat bread served with a mildly spiced, dry potato curry.",
                picklePairingName: "Mewari Mango Pickle",
                pairingReason: "The classic festive pairing! The mango pickle adds that extra zest to the mild potato bhaji.",
                prepTime: "35 Mins",
                difficulty: "Medium",
                spiceLevel: "Low",
                ingredients: "• 2 cups Wheat Flour (for Puri)\n• 3 Boiled Potatoes\n• Mustard Seeds, Turmeric, Curry Leaves",
                instructions: "1. Make a stiff dough for puris and deep fry small rolled circles until they puff up.\n2. For bhaji, temper mustard seeds and curry leaves in oil, add turmeric.\n3. Toss in roughly mashed boiled potatoes and cook for 2 mins."
            },
            hi: {
                name: "पूरी भाजी",
                description: "फूली हुई, तली हुई गेहूं की पूरी को हल्के मसालेदार सूखे आलू की सब्जी के साथ परोसा जाता है।",
                picklePairingName: "मेवाड़ी आम का अचार",
                pairingReason: "त्योहारों का क्लासिक जोड़ा! आम का अचार हल्की आलू की भाजी में ज़ायका डाल देता है।",
                prepTime: "35 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "कम",
                ingredients: "• 2 कप गेहूं का आटा (पूरी के लिए)\n• 3 उबले आलू\n• राई, हल्दी, करी पत्ता",
                instructions: "1. पूरियों के लिए सख्त आटा गूंध लें और छोटी गोल बेल कर फूलने तक तल लें।\n2. भाजी के लिए, तेल में राई और करी पत्ते का तड़का लगाएँ, फिर हल्दी डालें।\n3. मोटे-मोटे मैश किए हुए उबले आलू डालें और 2 मिनट तक पकाएँ।"
            },
            pickleImageResId: "/images/products/mango.jpg"
        },
        "Upma": {
            en: {
                name: "Upma",
                description: "A savory South Indian breakfast porridge made from dry-roasted semolina, vegetables, and tempered spices.",
                picklePairingName: "Mewari Sweet Lemon Pickle",
                pairingReason: "The sweet-sour profile of the lemon pickle cuts through the soft, savory texture of Upma brilliantly.",
                prepTime: "20 Mins",
                difficulty: "Easy",
                spiceLevel: "Medium",
                ingredients: "• 1 cup Rava (Semolina)\n• Mustard seeds, Urad Dal, Curry Leaves\n• Chopped veggies (carrots, peas)\n• 2.5 cups Water",
                instructions: "1. Dry roast rava until fragrant.\n2. In a pan, temper mustard seeds, dal, and curry leaves. Sauté veggies.\n3. Boil water, add salt, and slowly pour in the roasted rava while stirring continuously.\n4. Cover and cook until fluffy."
            },
            hi: {
                name: "उपमा",
                description: "सूजी, सब्जियों और मसालों के तड़के से बना एक स्वादिष्ट दक्षिण भारतीय नाश्ता।",
                picklePairingName: "मेवाड़ी मीठा नींबू का अचार",
                pairingReason: "नींबू के अचार का खट्टा-मीठा स्वाद उपमा की बनावट को और भी स्वादिष्ट बना देता है।",
                prepTime: "20 मिनट",
                difficulty: "आसान",
                spiceLevel: "मध्यम",
                ingredients: "• 1 कप सूजी (रवा)\n• राई, उड़द दाल, करी पत्ता\n• कटी हुई सब्जियां (गाजर, मटर)\n• 2.5 कप पानी",
                instructions: "1. सूजी को खुशबू आने तक सूखा भून लें।\n2. पैन में राई, दाल और करी पत्ते का तड़का लगाएँ। सब्जियां भूनें।\n3. पानी उबालें, नमक डालें, और लगातार चलाते हुए धीरे-धीरे भुनी हुई सूजी डालें।\n4. ढककर फूलने तक पकाएँ।"
            },
            pickleImageResId: "/images/products/amla.jpg"
        },
        "Paneer Paratha": {
            en: {
                name: "Paneer Paratha",
                description: "A rich, fulfilling flatbread stuffed with spiced, crumbled cottage cheese (paneer).",
                picklePairingName: "Mewari Chilli Pickle",
                pairingReason: "The soft, milky paneer filling needs the sharp, fiery contrast of chilli pickle to make the flavors pop.",
                prepTime: "30 Mins",
                difficulty: "Medium",
                spiceLevel: "Medium",
                ingredients: "• 2 cups Wheat Flour Dough\n• 1 cup grated Paneer\n• Fresh Coriander, Green Chillies\n• Chaat Masala & Salt",
                instructions: "1. Mix grated paneer with chillies, coriander, and spices.\n2. Stuff the mixture into a dough ball and roll it out.\n3. Roast on a tawa with ghee until golden brown."
            },
            hi: {
                name: "पनीर पराठा",
                description: "मसालेदार पनीर से भरा एक स्वादिष्ट और पौष्टिक पराठा।",
                picklePairingName: "मेवाड़ी मिर्च का अचार",
                pairingReason: "पनीर के हल्के स्वाद को एक तीखे और मसालेदार मिर्च के अचार की जरूरत होती है।",
                prepTime: "30 मिनट",
                difficulty: "मध्यम",
                spiceLevel: "मध्यम",
                ingredients: "• 2 कप गेहूं के आटे का डो (आटा)\n• 1 कप कद्दूकस किया हुआ पनीर\n• ताज़ा हरा धनिया, हरी मिर्च\n• चाट मसाला और नमक",
                instructions: "1. कद्दूकस किए हुए पनीर को मिर्च, धनिया और मसालों के साथ मिला लें।\n2. इस मिश्रण को आटे की लोई में भरें और बेल लें।\n3. तवे पर घी लगाकर सुनहरा भूरा होने तक सेकें।"
            },
            pickleImageResId: "/images/products/chilli.jpg"
        }
    };

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (selectedRecipe) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedRecipe]);


    const pairings = [
        {
            name: "Mango Pickle",
            hiName: "आम का अचार",
            color: "#7A0C0C",
            recipes: [
                { name: "Aloo Paratha", image: "/images/pairings/img_paratha.jpg" },
                { name: "Dal Tadka", image: "/images/pairings/img_dal_tadka.jpg" },
                { name: "Rajma Chawal", image: "/images/pairings/img_rajma_chawal.jpg" },
                { name: "Puri Bhaji", image: "/images/pairings/img_puri_bhaji.jpg" }
            ]
        },
        {
            name: "Chili Pickle",
            hiName: "मिर्च का अचार",
            color: "#7A0C0C",
            recipes: [
                { name: "Chole Bhature", image: "/images/pairings/img_chole_bhature.jpg" },
                { name: "Samosa", image: "/images/pairings/img_samosa.jpg" },
                { name: "Paneer Paratha", image: "/images/pairings/img_paneer_paratha.jpg" },
                { name: "Mathri", image: "/images/pairings/img_mathri.jpg" }
            ]
        },
        {
            name: "Garlic Pickle",
            hiName: "लहसुन का अचार",
            color: "#7A0C0C",
            recipes: [
                { name: "Bajre Ki Roti", image: "/images/pairings/img_bajre_ki_roti.jpg" },
                { name: "Dal Baati", image: "/images/pairings/img_dal_baati.jpg" },
                { name: "Makki Ki Roti", image: "/images/pairings/img_makki_roti.jpg" }
            ]
        },
        {
            name: "Sweet Lemon Pickle",
            hiName: "मीठा नींबू का अचार",
            color: "#7A0C0C",
            recipes: [
                { name: "Poha", image: "/images/pairings/img_poha.jpg" },
                { name: "Upma", image: "/images/pairings/img_upma.jpg" },
                { name: "Thepla", image: "/images/pairings/img_thepla.jpg" }
            ]
        },
        {
            name: "Mix Pickle",
            hiName: "मिक्स अचार",
            color: "#7A0C0C",
            recipes: [
                { name: "Khichdi", image: "/images/pairings/img_khichdi.jpg" }
            ]
        }
    ];

    const handleActionClick = async (recipeDetails) => {
        const pName = recipeDetails.picklePairingName;
        if (pName.toLowerCase().includes("mango")) {
            const message = `Namaste! I would like to order Mewari Mango Achaar (500g).`;
            window.open(`https://wa.me/917014102742?text=${encodeURIComponent(message)}`, '_blank');
        } else {
            if (!user) {
                setActiveModal('login-toast');
                return;
            }
            const cacheKey = `notify_${user.email}_${pName}`;
            if (localStorage.getItem(cacheKey)) {
                alert("You are already on the waitlist, please wait...");
                return;
            }
            try {
                const response = await fetch('/api/send-notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: user.email,
                        userName: user.displayName || 'Valued Guest',
                        productName: pName
                    })
                });
                if (response.ok) {
                    localStorage.setItem(cacheKey, "true");
                    alert(`You're on the waitlist for ${pName}! We will notify you when it launches.`);
                } else {
                    alert('Failed to join waitlist. Please try again.');
                }
            } catch (err) {
                alert('Error joining waitlist.');
            }
        }
    };

    return (
        <main className="main-wrapper" style={{ background: '#FFFDF9' }}>
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '100px', paddingBottom: '20px', background: '#7A0C0C', color: '#D4AF37' }}>
                <div className="section-header">
                    <h1 className="section-display" style={{ color: '#D4AF37', textAlign: 'center', fontSize: '1.5rem', margin: 0, fontFamily: 'serif' }}>{t('royalPairingsGuide')}</h1>
                </div>
            </section>

            <section className="pairing-section">
                <div className="pairing-container">
                    {pairings.map((group, index) => (
                        <div key={index} className="pairing-group">
                            <h2 className="pairing-group-title">
                                {language === 'hi' ? `${group.hiName} के साथ` : `${group.name} Pairings`}
                            </h2>
                            
                            <div className="horizontal-scroll-container">
                                <div className="recipes-row">
                                    {group.recipes.map((recipe, i) => (
                                        <div key={i} className="recipe-item" onClick={() => setSelectedRecipe({ ...recipeDatabase[recipe.name][language === 'hi' ? 'hi' : 'en'], image: recipe.image, pickleImageResId: recipeDatabase[recipe.name].pickleImageResId })}>
                                            <div className="recipe-circle-wrapper">
                                                <img src={recipe.image} alt={recipe.name} className="recipe-circle-img" />
                                            </div>
                                            <span className="recipe-item-name">{language === 'hi' ? recipeDatabase[recipe.name].hi.name : recipeDatabase[recipe.name].en.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedRecipe && (
                <div className="recipe-modal-overlay" onClick={() => setSelectedRecipe(null)}>
                    <div className="recipe-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedRecipe(null)}>×</button>
                        
                        <div className="modal-header-image">
                            <img src={selectedRecipe.image} alt={selectedRecipe.name} />
                            <div className="modal-title-overlay">
                                <h2>{selectedRecipe.name}</h2>
                            </div>
                        </div>

                        <div className="modal-body">
                            <p className="recipe-desc">{selectedRecipe.description}</p>
                            
                            <div className="recipe-stats">
                                <div className="stat"><span>{language === 'hi' ? 'तैयारी' : 'Prep'}</span><strong>{selectedRecipe.prepTime}</strong></div>
                                <div className="stat"><span>{language === 'hi' ? 'स्तर' : 'Diff'}</span><strong>{selectedRecipe.difficulty}</strong></div>
                                <div className="stat"><span>{language === 'hi' ? 'तीखापन' : 'Spice'}</span><strong>{selectedRecipe.spiceLevel}</strong></div>
                            </div>

                            <div className="pairing-reason-box">
                                <div className="pairing-reason-header">
                                    <img src={selectedRecipe.pickleImageResId || "/images/products/mango.jpg"} alt="Pickle" className="mini-pickle-img" />
                                    <h3>{selectedRecipe.picklePairingName}</h3>
                                </div>
                                <p>{selectedRecipe.pairingReason}</p>
                            </div>

                            <div className="recipe-instructions-section">
                                <h3>{language === 'hi' ? 'सामग्री' : 'Ingredients'}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{selectedRecipe.ingredients}</p>
                                
                                <h3 style={{ marginTop: '20px' }}>{language === 'hi' ? 'विधि' : 'Instructions'}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{selectedRecipe.instructions}</p>
                            </div>

                            {selectedRecipe.picklePairingName.toLowerCase().includes("mango") || selectedRecipe.picklePairingName.includes("आम") ? (
                                <div style={{ marginTop: '20px' }}>
                                    <select 
                                      id="modal-size-select"
                                      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333', fontSize: '0.9rem', outline: 'none' }}
                                    >
                                      <option value="500g">500 Grams (Plastic Jar) - Rs. 200.00</option>
                                      <option value="1kg">1 kg (Plastic Jar) - Rs. 399.00</option>
                                      <option value="5kg">Bulk Order (5kg Bucket) - Wholesale Rate</option>
                                      <option value="500g-glass" disabled>500 Grams (Glass Jar) - Coming Soon</option>
                                      <option value="1kg-glass" disabled>1 kg (Glass Jar) - Coming Soon</option>
                                    </select>
                                    <button 
                                        className="action-btn"
                                        onClick={() => {
                                            const selectElement = document.getElementById('modal-size-select');
                                            const selectedSize = selectElement ? selectElement.value : '500g';
                                            const message = `Namaste! I would like to order Mewari Mango Achaar (${selectedSize}).`;
                                            window.open(`https://wa.me/917014102742?text=${encodeURIComponent(message)}`, '_blank');
                                        }}
                                        style={{ background: '#7A0C0C', color: '#fff' }}
                                    >
                                        {language === 'hi' ? 'अभी ऑर्डर करें' : 'ORDER NOW'}
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    className="action-btn"
                                    onClick={() => handleActionClick({ picklePairingName: recipeDatabase[Object.keys(recipeDatabase).find(k => recipeDatabase[k].en.name === selectedRecipe.name || recipeDatabase[k].hi.name === selectedRecipe.name)].en.picklePairingName })}
                                    style={{ background: '#D4AF37', color: '#000' }}
                                >
                                    {language === 'hi' ? 'मुझे सूचित करें' : 'NOTIFY ME'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            <style jsx>{`
                .pairing-section {
                    padding-bottom: 60px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .pairing-container {
                    padding-bottom: 40px;
                }
                .pairing-group {
                    margin-top: 40px;
                    margin-bottom: 20px;
                }
                .pairing-group-title {
                    font-family: serif;
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #7A0C0C;
                    margin-bottom: 30px;
                    text-align: center;
                    border-bottom: 1px solid rgba(122, 12, 12, 0.1);
                    padding-bottom: 15px;
                }
                .horizontal-scroll-container {
                    width: 100%;
                    padding: 0 16px;
                }
                .recipes-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 30px;
                    padding-bottom: 20px;
                }
                .recipe-item {
                    width: 120px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .recipe-item:hover {
                    transform: scale(1.08);
                }
                .recipe-circle-wrapper {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                    margin-bottom: 12px;
                    border: 3px solid transparent;
                    transition: border 0.3s ease, box-shadow 0.3s ease;
                }
                .recipe-item:hover .recipe-circle-wrapper {
                    border: 3px solid #D4AF37;
                    box-shadow: 0 12px 24px rgba(212, 175, 55, 0.3);
                }
                .recipe-circle-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .recipe-item-name {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #2c1810;
                    text-align: center;
                    line-height: 1.2;
                }

                /* Modal Styles */
                .recipe-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.6);
                    z-index: 100000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .recipe-modal-content {
                    background: #FFFDF9;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-sizing: border-box;
                }
                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    font-size: 20px;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-header-image {
                    width: 100%;
                    height: 200px;
                    position: relative;
                }
                .modal-header-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                }
                .modal-title-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: 20px 15px 10px;
                }
                .modal-title-overlay h2 {
                    color: white;
                    margin: 0;
                    font-family: serif;
                    font-size: 1.5rem;
                }
                .modal-body {
                    padding: 20px;
                }
                .recipe-desc {
                    color: #555;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                .recipe-stats {
                    display: flex;
                    justify-content: space-between;
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .stat span {
                    font-size: 0.8rem;
                    color: #888;
                }
                .stat strong {
                    font-size: 1rem;
                    color: #2E1E1E;
                }
                .pairing-reason-box {
                    background: #FFF8E7;
                    border-left: 4px solid #D4AF37;
                    padding: 15px;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }
                .pairing-reason-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .mini-pickle-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .pairing-reason-header h3 {
                    margin: 0;
                    font-size: 1rem;
                    color: #7A0C0C;
                }
                .recipe-instructions-section h3 {
                    font-size: 1.1rem;
                    color: #2E1E1E;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 5px;
                }
                .recipe-instructions-section p {
                    font-size: 0.9rem;
                    color: #444;
                    line-height: 1.6;
                }
                .action-btn {
                    width: 100%;
                    padding: 15px;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    font-size: 1rem;
                    margin-top: 25px;
                    margin-bottom: 20px;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: opacity 0.2s;
                }
                .action-btn:hover {
                    opacity: 0.9;
                }
            `}</style>
            
            {activeModal === 'login-toast' && (
              <div className="toast-overlay" onClick={() => setActiveModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s' }}>
                <div className="toast-content" onClick={e => e.stopPropagation()} style={{ background: '#fff', padding: '30px', borderRadius: '16px', textAlign: 'center', maxWidth: '320px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ color: '#8B0000', marginBottom: '10px', fontSize: '1.2rem', fontFamily: 'serif' }}>{language === 'hi' ? 'लॉगिन आवश्यक है' : 'Login Required'}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '25px', lineHeight: '1.5' }}>{language === 'hi' ? 'वेटलिस्ट में शामिल होने के लिए आपको लॉगिन करना होगा।' : 'You need to login to join the waitlist.'}</p>
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => router.push('/login')} style={{ flex: 1, padding: '10px', fontSize: '0.95rem', textAlign: 'center', borderRadius: '8px', background: '#8B0000', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>{language === 'hi' ? 'लॉगिन' : 'Login'}</button>
                    <button onClick={() => router.push('/signup')} style={{ flex: 1, padding: '10px', fontSize: '0.95rem', textAlign: 'center', background: 'transparent', color: '#8B0000', border: '1px solid #8B0000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{language === 'hi' ? 'साइन अप' : 'Sign Up'}</button>
                  </div>
                  <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>×</button>
                </div>
              </div>
            )}
        </main>
    );
}
