import { HubChrome } from '@/components/hub/hub-chrome';

export default function MoveHubLayout({ children }: { children: React.ReactNode }) {
  return <HubChrome hubId="move">{children}</HubChrome>;
}