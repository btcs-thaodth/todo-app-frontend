import { Dropdown, Menu } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronDown, IoGlobeOutline } from 'react-icons/io5';
import languageMap from 'src/locales/languageMap';

const SimpleNavbar: FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = ({ key }: any) => {
    i18n.changeLanguage(key);
  };

  const languageMenu = (
    <Menu className="min-w-[96px]" onClick={handleLanguageChange}>
      {Object.keys(languageMap).map((key:string) => (
        <Menu.Item key={key}>{languageMap[key as keyof typeof languageMap]}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="h-12 grid grid-cols-[1fr_auto]">
      <div className="ml-24 flex items-center"></div>
      <div className="mr-24 flex items-center">
        <div className="text-gray-600 hover:text-gray-900 hover:cursor-pointer">
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <div className="flex items-center justify-end">
              <IoGlobeOutline size={18} className="mr-1" />
              {languageMap[i18n.language.split('-')[0] as keyof typeof languageMap]}
              <IoChevronDown size={14} className="ml-1" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default SimpleNavbar;
