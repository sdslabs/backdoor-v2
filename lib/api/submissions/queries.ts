import { SubmissionResp } from '@/lib/types';
import { SUBMISSIONS } from './mock-data';
import { SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';

const fetchSubmissions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{ data: SubmissionResp[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const skip = (page - 1) * limit;
      const data = SUBMISSIONS.slice(skip, skip + limit);
      const total = SUBMISSIONS.length;
      resolve({ data, total });
    }, 1000);
  });
};

export const submissionsTableQuery = ({
  page = 1,
  limit = SUBMISSIONS_TABLE_PAGE_LIMIT,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return {
    queryKey: ['submissions', { page, limit }],
    queryFn: () => fetchSubmissions({ page, limit }),
    refetchInterval: 1000 * 60 * 2, // refetch every 2 minutes
  };
};

// For backward compatibility
export const submissionsTableServerQuery = submissionsTableQuery;
