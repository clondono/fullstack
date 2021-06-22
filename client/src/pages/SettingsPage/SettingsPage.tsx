import { Divider } from 'antd';
import { PasswordSection } from './PasswordSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';

function SettingsPage() {
  return (
    <div>
      <h2>Settings</h2>
      <Divider orientation='left'></Divider>
      <PasswordSection />
      <Divider orientation='left'></Divider>
      <PersonalDetailsSection />
    </div>
  );
}

export { SettingsPage };
