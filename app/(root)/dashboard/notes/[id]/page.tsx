const force = "force-dynamic";

const NotePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;

  try {
    const response = await fetch(`https://api.example.com/notes/${id}`);
    const note = await response.json();

    if (!note) {
      return <div className="w-full flex justify-center items-center min-h-screen">Note not found</div>;
    }

    return (
      <div className="w-full flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-3xl shadow-xl rounded-xl p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{note.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{note.content}</p>
          <span className="text-sm text-gray-500">Created at: {new Date(note.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    );
  } catch (error) {
    return <div className="w-full flex justify-center items-center min-h-screen">Error fetching note</div>;
  }
};

export default NotePage;
