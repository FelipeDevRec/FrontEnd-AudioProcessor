import React from 'react';

export const AudioList = ({ audios }: { audios: any[] }) => {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arquivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Formato</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {audios.map((audio) => (
            <tr key={audio.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{audio.originalFilename}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  audio.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {audio.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{audio.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
