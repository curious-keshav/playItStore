import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./config";

export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);



    if (docSnap.exists()) {
        console.log("Product Data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

export const uploadSingleProduct = async (product) => {
    try {
        await setDoc(doc(db, "products", product.productId), product);
        console.log("Product uploaded!");
    } catch (error) {
        console.error("Error uploading product:", error);
    }
};

export const uploadProducts = async (products) => {
    for (const product of products) {
        try {
            await setDoc(doc(db, "products", product.productId), product);
            console.log(`Uploaded: ${product.productId}`);
        } catch (error) {
            console.error("Error uploading product:", product.productId, error);
        }
    }
};

export const fetchAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};