// TrojanFeed.jsx
import React from 'react';

const TrojanFeed = ({ items }) => (
  <div className="p-4 bg-black text-white rounded-xl">
    <h2 className="text-xl font-bold mb-2">🐎 Trojan Horse Feed</h2>
    <ul className="space-y-2">
      {items.map((entry, idx) => (
        <li key={idx} className="bg-gray-800 p-2 rounded-lg">
          <p className="text-sm">{entry.content}</p>
          <p className="text-xs text-gray-400">{entry.file} • Line {entry.line}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default TrojanFeed;
