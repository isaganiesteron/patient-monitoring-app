'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCaseStore } from '@/store/caseStore';
import Link from 'next/link';

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const cases = useCaseStore(state => state.cases);

  const filteredCases = cases.filter(
    (c) => c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cases</h1>
        <Link href="/dashboard/cases/new">
          <Button>New Case</Button>
        </Link>
      </div>
      <Input
        placeholder="Search cases..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCases.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.patientName}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{new Date(c.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/dashboard/cases/${c.id}`}>
                  <Button variant="outline" size="sm">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}