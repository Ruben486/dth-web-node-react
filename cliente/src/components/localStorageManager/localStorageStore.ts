import { ProductCardProps } from "@/components/product/types/productTypes";

const isLocalStorageAvailable = () => {
    try {
        const testKey = "__test__";
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
};

type StorageType = {
    keyName: string,
    items: ProductCardProps[]
}

export const addItemsToStorage = ({ keyName, items }: StorageType) => {
    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
        window.localStorage.setItem(keyName, JSON.stringify(items));
    }
};

export const cargarItemsFromStorage = ({ keyName }: Pick<StorageType, "keyName">) => {
    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
        const storedCart = window.localStorage.getItem(keyName);
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

export const removeItemsFromStorage = ({ keyName }: Pick<StorageType, "keyName">) => {
    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
        if (window.localStorage.getItem(keyName) !== null) {
            window.localStorage.removeItem(keyName);
        }
    }
};

