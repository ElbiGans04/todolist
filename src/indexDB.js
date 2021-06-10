export const error = () => {
    console.log("Database error")
}

export const upgradeneeded = (result) => {
    result.createObjectStore("task", { autoIncrement: true });
    console.log("Database berhasil Diupgrade")
}

export const transactionOnComplate = () => {
    console.log("Transaction Selesai")
}

export const transactionOnError = () => {
    console.log("Transaction Error")
}

export const requestOnSuccess = () => {
    console.log("request berhasil");
};

export const requestOnError = () => {
    console.error("request gagal");
}