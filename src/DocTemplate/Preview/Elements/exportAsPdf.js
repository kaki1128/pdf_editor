import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportAsPdf = async (element, imageFileName) => {
    // const html = document.getElementsByTagName("html")[0];
    // const body = document.getElementsByTagName("body")[0];
    // let htmlWidth = html.clientWidth;
    // let bodyWidth = body.clientWidth;

    // const newWidth = element.scrollWidth - element.clientWidth;

    // if (newWidth > element.clientWidth) {
    //     htmlWidth += newWidth;
    //     bodyWidth += newWidth;
    // }

    // html.style.width = htmlWidth + "px";
    // body.style.width = bodyWidth + "px";

    const canvas = await html2canvas(element, {
        scale: 3,
        // dpi: 240,
        // onrendered: myRenderFunction
    });;
    const image = canvas.toDataURL("image/png", 1.0);

    //IMG
    // downloadImage(image, imageFileName);
    // html.style.width = null;
    // body.style.width = null;

    //PDF
    const imgWidth = 2480;
    const imgHeight = canvas.height * imgWidth / canvas.width
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(image, 'PNG', 0, 0, imgWidth / 11.8, imgHeight / 11.8);
    pdf.save("Doc.pdf")

};
export default exportAsPdf;

const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};