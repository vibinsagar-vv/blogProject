import AXIOS from 'axios'
async function UploadImage(image){
    // console.log('insideImageUpload',image);
    const formdata = new FormData()
    formdata.append('product',image)
    const resData = await AXIOS.post("http://localhost:7800/products/upload-product-image",formdata,{headers:{'Content-Type':'multipart/form-data'}})
}
export default UploadImage