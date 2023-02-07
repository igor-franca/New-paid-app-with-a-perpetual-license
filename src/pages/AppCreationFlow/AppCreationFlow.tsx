import { useState } from 'react';

import { Footer } from '../../components/Footer/Footer';
import { AppFlowList } from '../../components/NewAppFlowList/AppFlowList';
import { NewAppToolBar } from '../../components/NewAppToolBar/NewAppToolBar';
import { CreateNewAppPage } from '../CreateNewAppPage/CreateNewAppPage';
import { initialFLowListItems } from './AppCreationFlowUtil';

import { ProvideAppBuildPage } from '../ProvideAppBuildPage/ProvideAppBuildPage';
import { CustomizeAppStorefrontPage } from '../StorefrontPage/CustomizeAppStorefrontPage';
import { ChoosePricingModelPage } from '../ChoosePricingModelPage/ChoosePricingModelPage';
import { InformLicensingTermsPage } from '../InformLicensingTermsPage/InformLicensingTermsPage';
import { ProvideVersionDetailsPage } from '../ProvideVersionDetailsPage/ProvideVersionDetailsPage';
import {ProvideAppSupportAndHelpPage} from '../ProvideAppSupportAndHelpPage/ProvideAppSupportAndHelpPage';

import './AppCreationFlow.scss';
import { SetAppPrivacyPage } from '../SetAppPrivacyPage/SetAppPrivacyPage';

type SetAppFlowListStateProps = {
    checkedItems?: string[];
    selectedItem: string;
}

export function AppCreationFlow() {
    const [appFlowListItems, setAppFlowListItems] = useState(initialFLowListItems);
    const [currentFlow, setCurrentFlow] = useState('create');

    console.log(appFlowListItems);

    const setAppFlowListState = ({ checkedItems, selectedItem }: SetAppFlowListStateProps) => {
        const newAppFlowListItems = appFlowListItems.map(appItem => {
            if (checkedItems?.includes(appItem.name)) {
                return {
                    ...appItem,
                    checked: true,
                    selected: false,
                }
            }

            if (appItem.name === selectedItem) {
                return {
                    ...appItem,
                    checked: false,
                    selected: true,
                }
            }

            return {
                ...appItem,
                checked: false,
                selected: false,
            }
        });

        setAppFlowListItems(newAppFlowListItems);
    }

    return (
        <div className='app-creation-flow-container'>
            <NewAppToolBar
                accountName='Acme Co.'
            />

            <div className='app-creation-flow-body'>
                <AppFlowList
                    appFlowListItems={appFlowListItems}
                />

                {currentFlow === 'create' && (
                    <CreateNewAppPage
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create"],
                                selectedItem: "profile"
                            });

                            setCurrentFlow('build');
                        }}
                    />
                )}

                {currentFlow === 'build' && (
                    <ProvideAppBuildPage
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "profile"
                            });

                            setCurrentFlow('profile');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build"],
                                selectedItem: "storefront"
                            });

                            setCurrentFlow('storefront');
                        }}
                    />
                )}

                {currentFlow === 'storefront' && (
                    <CustomizeAppStorefrontPage
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "build"
                            });

                            setCurrentFlow('build');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront"],
                                selectedItem: "version"
                            });

                            setCurrentFlow('version');
                        }}
                    />
                )}

                {currentFlow === 'version' && (
                    <ProvideVersionDetailsPage
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "storefront"
                            });

                            setCurrentFlow('storefront');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront", "version"],
                                selectedItem: "pricing"
                            });

                            setCurrentFlow('pricing');
                        }}
                    />
                )}

                {currentFlow === 'pricing' && (
                    <ChoosePricingModelPage
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "version"
                            });

                            setCurrentFlow('version');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront", "version", "pricing"],
                                selectedItem: "licensing"
                            });

                            setCurrentFlow('licensing');
                        }}
                    />
                )}

                {currentFlow === 'licensing' && (
                    <InformLicensingTermsPage
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "pricing"
                            });

                            setCurrentFlow('pricing');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront", "version", "pricing", "licensing"],
                                selectedItem: "support"
                            });

                            setCurrentFlow('support');
                        }}
                    />
                )}

                {currentFlow === 'support' && (
                    <ProvideAppSupportAndHelpPage 
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "licensing"
                            });

                            setCurrentFlow('licensing');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront", "version", "pricing", "licensing", "support"],
                                selectedItem: "privacy"
                            });

                            setCurrentFlow('privacy');
                        }}
                    />
                )}

                {currentFlow === 'privacy' && (
                    <SetAppPrivacyPage 
                        onClickBack={() => {
                            setAppFlowListState({
                                selectedItem: "support"
                            });

                            setCurrentFlow('support');
                        }}
                        onClickContinue={() => {
                            setAppFlowListState({
                                checkedItems: ["create", "build", "storefront", "version", "pricing", "licensing", "support", "privacy"],
                                selectedItem: "submit"
                            });

                            setCurrentFlow('submit ');
                        }}
                    />
                )}
            </div>

            <Footer />
        </div>
    )
}