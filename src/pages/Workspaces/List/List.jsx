import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { fetchWorkspaces, deleteWorkspace } from '../../../api';
import { useNavigate } from 'react-router-dom';

import "./styles.scss";

export default function WorkspaceList() {
  const navigate     = useNavigate();
  const queryClient  = useQueryClient();

  const { data, isLoading, error } = useQuery(['ws'], fetchWorkspaces);

  const deleteMutation = useMutation(
    id => deleteWorkspace(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ws']);
      },
    }
  );

  if (isLoading) return <div>Loading…</div>;
  if (error)     return <div>Error loading workspaces</div>;

  return (
    <div className='list-container'>
      <div className='list-wrapper'>
        <h2 className='list-title'>Your Workspaces</h2>
        <div className='new-workspace-btn-container'>
          <button className='new-workspace-btn' onClick={() => navigate('/workspaces/create')}>
            New Workspace
          </button>
        </div>
        <div className='list-box'>
          {data.data.map(ws => (
            <div className='list-row' key={ws.id}>
              <span className='list-name' onClick={() => navigate(`/workspaces/${ws.id}`)}>
                <span>
                  {ws.name}
                </span>
              </span>
              <div className='list-actions'>
                <button className='edit-btn' onClick={() => navigate(`/workspaces/${ws.id}/edit`)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(ws.id)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
