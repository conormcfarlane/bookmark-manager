
export const formatShortDate = (date:string | Date) => new Date(date).toLocaleDateString("en-GB" , {
    day: "numeric",
    month: "short",
});

export const getFaviconSrc = (
    faviconPath:string,
    modules: Record<string,string>
) => {
    const fileName = faviconPath.split("/").pop();
    if(!fileName) return;
    return modules[`../images/${fileName}`] ?? "";
}