'use client';

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

// Default static fallback while loading
const defaultProducts = [
    { 
        id: 1, 
        translations: {
            en: { name: "Mango Pickle", desc: "Hand-cut raw mangoes, sun-ripened in a blend of mustard oil, fenugreek, and fennel." },
            hi: { name: "आम का अचार (Mango Achaar)", desc: "हाथ से कटे कच्चे आम, सरसों के तेल, मेथी और सौंफ के मिश्रण में धूप में पकाए हुए।" }
        },
        price500g: 200, 
        price1kg: 399, 
        image: "/Images/Mango Achar.jpg", 
        flavorProfile: { spicy: 8, tangy: 9, earthy: 5, pungent: 6 } 
    }
];

export function useProducts() {
  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProducts = [];
      const idMap = {
        "mango_pickle": 1,
        "chili_pickle": 2,
        "ginger_pickle": 3,
        "amla_pickle": 4,
        "turmeric_pickle": 5,
        "garlic_pickle": 6
      };
      snapshot.forEach((doc) => {
        fetchedProducts.push({
          ...doc.data(),
          id: idMap[doc.id] || doc.id,
        });
      });

      // Sort or maintain order, but prioritize available items first
      const order = [1, 2, 3, 4, 5, 6];
      fetchedProducts.sort((a, b) => {
          if (a.comingSoon !== b.comingSoon) {
              return a.comingSoon ? 1 : -1;
          }
          
          let aIndex = order.indexOf(a.id);
          let bIndex = order.indexOf(b.id);
          if(aIndex === -1) aIndex = 999;
          if(bIndex === -1) bIndex = 999;
          return aIndex - bIndex;
      });
      
      if(fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
      }
    });

    return () => unsubscribe();
  }, []);

  return products;
}
