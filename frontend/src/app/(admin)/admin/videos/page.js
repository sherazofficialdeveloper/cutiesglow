'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await adminService.getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this video?')) {
      try {
        await adminService.deleteVideo(id);
        setVideos(videos.filter(v => v.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'URL', accessor: 'url' },
    { header: 'Type', accessor: 'type' },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/videos/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
          Edit
        </Link>
        <button onClick={() => handleDelete(row.id)} className="text-sm font-medium text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    ) },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Videos</h1>
        <Link href="/admin/videos/add">
          <Button variant="primary" size="small">Add Video</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={videos} loading={loading} />
    </div>
  );
}