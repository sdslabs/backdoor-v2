import { SubmissionResp } from '@/lib/types';
import { SUBMISSIONS } from './mock-data';
import { SUBMISSIONS_TABLE_PAGE_LIMIT } from '@/lib/constants';
import { getUnauthenticatedAxios } from '../axios';

const fetchSubmissions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{ data: SubmissionResp[]; total: number }> => {
  const axios = getUnauthenticatedAxios();
  const response = await axios.get<SubmissionResp[]>('/api/info/submissions');
  const submissions = response.data;

  const skip = (page - 1) * limit;
  let data = submissions.slice(skip, skip + limit);

  // Convert date into readable format
  data = data.map((submission) => ({
    ...submission,
    solvedAt: new Date(submission.solvedAt),
  }));
  const total = submissions.length;
  return { data, total };
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
