import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore();

export const addToCart = async ({ productId, modelId, colorId }) => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
    }

    try {
        await addDoc(collection(db, "cart"), {
            userEmail,
            productId,
            modelId,
            colorId,
            createdAt: new Date(),
        });
        console.log("Product added to cart successfully");
    } catch (error) {
        console.error("Failed to add to cart:", error);
    }
};

export const fetchCartWithDetails = async () => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
        throw new Error("User email not found in localStorage.");
    }

    const cartSnapshot = await getDocs(collection(db, "cart"));
    const userCartDocs = cartSnapshot.docs.filter(doc => doc.data().userEmail === userEmail);

    const detailedCartPromises = userCartDocs.map(async (cartDoc) => {
        const cartItem = cartDoc.data();

        const productRef = doc(db, "products", cartItem.productId);
        const modelRef = doc(db, "products", cartItem.productId, "models", cartItem.modelId);
        const colorRef = doc(db, "products", cartItem.productId, "models", cartItem.modelId, "colors", cartItem.colorId);

        const [productSnap, modelSnap, colorSnap] = await Promise.all([
            getDoc(productRef),
            getDoc(modelRef),
            getDoc(colorRef),
        ]);

        return {
            cartId: cartDoc.id,
            ...cartItem,
            productData: productSnap.exists() ? productSnap.data() : null,
            modelData: modelSnap.exists() ? modelSnap.data() : null,
            colorData: colorSnap.exists() ? colorSnap.data() : null,
        };
    });

    console.log(Promise.all(detailedCartPromises), "hellll")

    return Promise.all(detailedCartPromises);
};


export const deleteCartItem = async (cartId) => {
    try {
        const cartRef = doc(db, 'cart', cartId);
        await deleteDoc(cartRef);
        console.log('Cart item deleted successfully');
        return true;
    } catch (err) {
        console.error("Error deleting cart item:", err);
        return false;
    }
};
