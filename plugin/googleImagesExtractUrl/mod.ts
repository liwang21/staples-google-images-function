const accessToken = 'ya29.a0AWY7CkmqQxKLH1wsJuMFg3WJ2JNIZYYqoo6djrbx5snL8trdaSbMze9P3FGyOs2NW2LXGEa2IgkhjUfviDNDhIoFMmqEabIBPjOl2pt87VczSIwcKOY10DSXwF-FH6GVRKI4DOaQ-Jla3HuFogAUejCRX5d0eGsaCgYKAcESARMSFQG1tDrpR_LWRfj8syRxBVxtRekk1A0166'
const apiKey = 'c817da71fe00768841d427ce71875531'; //replace with client account API Key

const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
}

export const getYextPhotoGallery = async(entityId:string) => {
    const params = new URLSearchParams({
        v: '20230403',
        api_key: `${apiKey}`
    })
    const endpoint = `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?${params.toString()}`
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const photoGallery = (await fetch(endpoint, requestOptions).then(response => response.json())).response.photoGallery;
    console.log(photoGallery)
    let photoGalleryList = '';
    for (var i in photoGallery) {
        photoGalleryList += photoGallery[0].image.url + ','
        console.log('Add '+ i+' url to photo gallery list')
    }
    console.log(photoGalleryList)
    return(photoGalleryList)
}

export const getCPCoverPhotoUrl = async(parentFolderId:string) => {
    const parentFolderEndpoint = `https://www.googleapis.com/drive/v3/files?q=name%3D%27CP-Cover%20Photo%27%20and%20%27${parentFolderId}%27%20in%20parents`;
    const folderId = (await fetch(parentFolderEndpoint, requestOptions).then(response => response.json())).files[0].id;
    const imagesEndpoint = `https://www.googleapis.com/drive/v3/files?q=%22${folderId}%22+in+parents&fields=files(thumbnailLink)`;
    const coverPhoto = (await fetch(imagesEndpoint, requestOptions).then(response => response.json())).files[0].thumbnailLink
    return coverPhoto;
}

export const getCPPhotoGalleryUrls = async(parentFolderId:string) => {
    const parentFolderEndpoint = `https://www.googleapis.com/drive/v3/files?q=name%3D%27CP-Photo%20Gallery%27%20and%20%27${parentFolderId}%27%20in%20parents`;
    const folderId = (await fetch(parentFolderEndpoint, requestOptions).then(response => response.json())).files[0].id;
    const imagesEndpoint = `https://www.googleapis.com/drive/v3/files?q=%22${folderId}%22+in+parents&fields=files(thumbnailLink)`;
    const images = (await fetch(imagesEndpoint, requestOptions).then(response => response.json())).files;
    let urlList = '';
    for (var i in images) {
        urlList += images[i].thumbnailLink + ","
    }
    console.log(urlList)
    return urlList;
}

export const getPhotoGalleryUrls = async(parentFolderId:string) => {
    const parentFolderEndpoint = `https://www.googleapis.com/drive/v3/files?q=name%3D%27Photo%20Gallery%27%20and%20%27${parentFolderId}%27%20in%20parents`;
    const folderId = (await fetch(parentFolderEndpoint, requestOptions).then(response => response.json())).files[0].id;
    const imagesEndpoint = `https://www.googleapis.com/drive/v3/files?q=%22${folderId}%22+in+parents&fields=files(thumbnailLink)`;
    const images = (await fetch(imagesEndpoint, requestOptions).then(response => response.json())).files;
    let urlList = '';
    for (var i in images) {
        urlList += images[i].thumbnailLink + ","
    }
    console.log(urlList)
    return urlList;
}

export const getCoverPhotoUrl = async(parentFolderId:string) => {
    const parentFolderEndpoint = `https://www.googleapis.com/drive/v3/files?q=name%3D%27Cover%20Photo%27%20and%20%27${parentFolderId}%27%20in%20parents`;
    const folderId = (await fetch(parentFolderEndpoint, requestOptions).then(response => response.json())).files[0].id;
    const imagesEndpoint = `https://www.googleapis.com/drive/v3/files?q=%22${folderId}%22+in+parents&fields=files(thumbnailLink)`;
    const coverPhoto = (await fetch(imagesEndpoint, requestOptions).then(response => response.json())).files;
    if (coverPhoto.length > 0) {
        console.log(coverPhoto[0].thumbnailLink)
        return coverPhoto[0].thumbnailLink;
    }
    else return
}