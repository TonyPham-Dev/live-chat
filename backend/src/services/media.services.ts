import { getGfs } from "../config/db.config";

interface File extends Express.Multer.File {
    _id: string;
}

export const deleteMedias: (
    imgsName: string[],
) => Promise<{ success: boolean; message?: string }> = async (imgsName) => {
    try {
        if (imgsName.length === 0) {
            return { success: true };
        }
        const promiseList: any[] = [];
        imgsName.forEach((imgName) => {
            promiseList.push(
                new Promise((resolve, reject) => {
                    getGfs()
                        .find({ filename: imgName })
                        .toArray((err: Error, files: File[]) => {
                            if (err) {
                                reject("Error while deleting image");
                            } else {
                                if (!files || files.length <= 0) {
                                    reject("Image not found");
                                }
                                console.log(files[0]);
                                const postId = files[0]["_id"];
                                getGfs().delete(postId);
                                resolve("Img deleted");
                            }
                        });
                }),
            );
        });
        await Promise.all(promiseList);
        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};
