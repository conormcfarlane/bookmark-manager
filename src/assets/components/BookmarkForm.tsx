import { useState } from "react"

type BookmarkFormProps = {
    onSubmit: (values: { title: string; url: string; description: string; tags: string[]; }) => void;
    isLoading: boolean;
    error: string | null;
    onCancel: () => void;
}

export default function BookmarkForm({ onSubmit, isLoading, error, onCancel }: BookmarkFormProps) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    function handleSubmit(e: React.FormEvent) {   // <-- here
        e.preventDefault();
        onSubmit({ title, url, description, tags: tags.split(",").map(t => t.trim()).filter(Boolean) });
    }
    return (
        <section>
            <div><p className="text-preset1">Add a bookmark</p>
                <p>Save a link with details to keep your collection organized. We extract the favicon automatically from the URL</p></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="flex flex-col"><label htmlFor="">Title *</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border" /></div>
                        <div className="flex flex-col" ><label htmlFor="">URL *</label><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
                        <div className="flex flex-col" ><label htmlFor="">Description *</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                        <div className="flex flex-col" ><label htmlFor="">Tags *</label><input type="text" placeholder="E.g.. Design, Learning, Tools" value={tags} onChange={(e) => setTags(e.target.value)} /></div>
                    </div>
                    <div>
                        <button type="button" onClick={onCancel}>Cancel</button>
                        <button type="submit" disabled={isLoading} > {isLoading ? "Saving..." : "Add Bookmark"}</button>
                    </div>

                </form>
            </div>

        </section>
    )
}
