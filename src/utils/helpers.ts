export const formatShortDate = (date:string | Date) => new Date(date).toLocaleDateString("en-GB" , {
    day: "numeric",
    month: "short",
});