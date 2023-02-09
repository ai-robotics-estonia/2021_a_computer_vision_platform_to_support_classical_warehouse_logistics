import { useParams } from 'react-router-dom';

export default function useIdParam(paramName?: string): number | null {
  const params = useParams() as { [key: string]: string };
  const _paramName = paramName ?? 'id';
  const id = _paramName in params ? Number(params[_paramName]) : NaN;
  return isNaN(id) ? null : id;
}
