import { getGfs } from "../config/db.config";

export const deleteImgs: (
    imgsName: string[]
) => Promise<{ success: boolean; message?: string }> = async (imgsName) => {
    try {
        const promiseList: Promise<void>[] = [];
        imgsName.forEach((imgName) => {
            promiseList.push(
                new Promise((resolve, reject) => {
                    getGfs().delete({ filename: imgName }, (err: any) => {
                        if (err) return reject();
                        resolve();
                    });
                })
            );
        });
        await Promise.all(promiseList);
        return { success: true };
    } catch (err) {
        return { success: false, message: err.message };
    }
};
