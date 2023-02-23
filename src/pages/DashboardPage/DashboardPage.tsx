import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AppProps, DashboardTable } from "../../components/DashboardTable/DashboardTable";
import { Header } from "../../components/Header/Header";
import { DashboardListItems, DashboardNavigation } from "../../components/DashboardNavigation/DashboardNavigation";
import { DashboardToolbar } from "../../components/DashboardToolbar/DashboardToolbar";
import { Footer } from "../../components/Footer/Footer";
import { AppDetailsPage } from '../AppDetailsPage/AppDetailsPage';
import { appList, initialDashboardNavigationItems } from './DashboardPageUtil';

import accountLogo from '../../assets/icons/mainAppLogo.svg';

import './DashboardPage.scss';
import { getMasterCatalogId } from '../../utils/util';
import { getAllProducts, getProductSpecifications, ProductSpecifications } from '../../utils/api';

export function DashboardPage() {
    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState<AppProps>();
    const [dashboardNavigationItems, setDashboardNavigationItems] = useState(initialDashboardNavigationItems);

    useEffect(() => {
        const getData = async () => {
        const catalogId = await getMasterCatalogId();
        const productsResponse = await getAllProducts({catalogId});
            const {items : products} = productsResponse;
            const newAppList = products.map((product : any) => {
                let productSpecifications : ProductSpecifications[] = [];

                getProductSpecifications({appProductId : product.productId}).then( data => productSpecifications = data.items);

                const specifications = productSpecifications.map((currentSpecification) => {
                    return {
                        value : currentSpecification.value,
                        specificationKey : currentSpecification.specificationKey,
                    }
                })

                return {
                    image: product.thumbnail,
                    name: product.name,
                    updatedBy: 'Igor Franca',
                    updatedDate: product.modifiedDate,
                    updatedResponsible: 'you',
                    status: 'approved',
                    selected: false,
                    specifications: specifications
                } as AppProps
            })

            const currentAppNavigationItem = dashboardNavigationItems.find((navigationItem) => navigationItem.itemName === 'apps') as DashboardListItems;
            const newAppNavigationItem = {
                ...currentAppNavigationItem,
                items: newAppList,
            }
            setDashboardNavigationItems([
                ...dashboardNavigationItems.filter((navigationItem) => navigationItem.itemName !== 'apps'),
                newAppNavigationItem,
            ]);
                // dispatch({
                //     payload: {
                //       value: catalogId,
                //     },
                //     type: TYPES.UPDATE_CATALOG_ID,
                //   });
        }
        getData();
    }, []);

    return (
        <div className="dashboard-page-container">
            <div>
                <div className="dashboard-page-header-container">
                    <DashboardToolbar />
                </div>
                
                <div className="dashboard-page-body-container">
                    <DashboardNavigation
                        onSelectAppChange={setSelectedApp}
                        accountAppsNumber="4"
                        accountIcon={accountLogo}
                        accountTitle="Acme Co"
                        setDashboardNavigationItems={setDashboardNavigationItems}
                        dashboardNavigationItems={dashboardNavigationItems}
                    />

                    {selectedApp ? (
                        <AppDetailsPage
                            selectedApp={selectedApp}
                            dashboardNavigationItems={dashboardNavigationItems}
                            setSelectedApp={setSelectedApp}
                        />
                    )  : (                        
                        <div>
                            <div className="dashboard-page-body-header-container">
                                <Header
                                    title="Apps"
                                    description="Manage and publish apps on the Marketplace"
                                />

                                <button
                                    className="dashboard-page-body-header-button"
                                    onClick={() => navigate("/create-new-app")}
                                >
                                    + New App
                                </button>
                            </div>

                            <DashboardTable
                                apps={appList}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}