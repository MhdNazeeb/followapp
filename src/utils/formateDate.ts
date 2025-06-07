export const formatDate = (createdAt: string | null | Date) => {
    if (!createdAt) return "";

    const jobDate = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday =
        jobDate.getDate() === today.getDate() &&
        jobDate.getMonth() === today.getMonth() &&
        jobDate.getFullYear() === today.getFullYear();

    const isYesterday =
        jobDate.getDate() === yesterday.getDate() &&
        jobDate.getMonth() === yesterday.getMonth() &&
        jobDate.getFullYear() === yesterday.getFullYear();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return jobDate.toISOString().split("T")[0].replace(/-/g, "-").slice(2); 
};
