'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCaseStore } from '@/store/caseStore';
import { useToast } from '@/components/ui/use-toast';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const { cases, updateCase, deleteCase, addComment } = useCaseStore();

  const caseId = parseInt(params.id as string);
  const caseDetail = cases.find(c => c.id === caseId);

  if (!caseDetail) {
    return <div>Case not found</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    updateCase(caseId, { ...caseDetail, status: newStatus });
    toast({
      title: 'Status Updated',
      description: `Case status changed to ${newStatus}`,
    });
  };

  const handleDelete = () => {
    deleteCase(caseId);
    toast({
      title: 'Case Deleted',
      description: 'The case has been successfully deleted',
    });
    router.push('/dashboard/cases');
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(caseId, comment);
      setComment('');
      toast({
        title: 'Comment Added',
        description: 'Your comment has been added to the case',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Case Details</h1>
        <Button variant="destructive" onClick={handleDelete}>Delete Case</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {caseDetail.patientName}</p>
          <p><strong>Status:</strong> {caseDetail.status}</p>
          <p><strong>Last Updated:</strong> {new Date(caseDetail.lastUpdated).toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Change Status</h3>
            <div className="flex space-x-2">
              <Button onClick={() => handleStatusChange('Active')} variant={caseDetail.status === 'Active' ? 'default' : 'outline'}>Active</Button>
              <Button onClick={() => handleStatusChange('Resolved')} variant={caseDetail.status === 'Resolved' ? 'default' : 'outline'}>Resolved</Button>
              <Button onClick={() => handleStatusChange('Critical')} variant={caseDetail.status === 'Critical' ? 'default' : 'outline'}>Critical</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here..."
              className="mb-2"
            />
            <Button onClick={handleAddComment}>Add Comment</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {caseDetail.comments.length > 0 ? (
            <ul className="space-y-4">
              {caseDetail.comments.map((comment, index) => (
                <li key={index} className="bg-muted p-3 rounded">
                  <p className="text-sm text-muted-foreground mb-1">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  // This function is required for static site generation with dynamic routes
  // For now, we'll return an empty array as we're using client-side data fetching
  return [];
}