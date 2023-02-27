import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { NewAppPageFooterButtons } from "../../components/NewAppPageFooterButtons/NewAppPageFooterButtons";
import { Section } from "../../components/Section/Section";
import { TYPES } from "../../manage-app-state/actionTypes";
import { useAppContext } from "../../manage-app-state/AppManageState";
import { createProductSpecification, createSpecification, updateProductSpecification } from "../../utils/api";

import "./ProvideVersionDetailsPage.scss";

interface ProvideVersionDetailsPageProps {
  onClickBack: () => void;
  onClickContinue: () => void;
}

export function ProvideVersionDetailsPage({
  onClickBack,
  onClickContinue,
}: ProvideVersionDetailsPageProps) {
  const [{ appNotes, appVersion, appId, appProductId }, dispatch] = useAppContext();

  async function saveAndUpdate(productSpecificationId: number, key: string, title: string, value: string, action: TYPES) {
    const id = await submitSupportURLs(productSpecificationId, key, title, value);
  
    dispatch({
      payload: {
        id,
        value,
      },
      type: action,
    })
  }
  
  async function submitSupportURLs(productSpecificationId: number, key: string, title: string, value: string): Promise<void> {
    const dataSpecification = await createSpecification({
      body: {
        key: key,
        title: { en_US: title },
      },
    });
    if (productSpecificationId) {
      updateProductSpecification({
        body: {
          specificationKey: dataSpecification.key,
          value: { en_US: value },
        },
        id: productSpecificationId,
      });
  
      return;
    } else {
      const { id } = await createProductSpecification({
        body: {
          productId: appProductId,
          specificationId: dataSpecification.id,
          specificationKey: dataSpecification.key,
          value: { en_US: value },
        },
        appId,
      });
  
      return id;
    }
  
  };
  
  return (
    <div className="provide-version-details-page-container">
      <div className="provide-version-details-page-header">
        <Header
          title="Provide version details"
          description="Define version information for your app. This will inform users about this version’s updates on the storefront."
        />
      </div>

      <Section label="App Version" tooltip="More info" tooltipText="More Info">
        <Input
          helpMessage={"This is the first version of the app to be published"}
          label="Version"
          onChange={({ target }) =>
            dispatch({
              payload: {
                payload: { id: appVersion?.id, value: target.value }
              },
              type: TYPES.UPDATE_APP_VERSION,
            })
          }
          placeholder="0.0.0"
          required
          tooltip="version"
          value={appVersion?.value}
        />

        <Input
          component="textarea"
          label="Notes"
          localized
          onChange={({ target }) =>
            dispatch({
              payload: {
                payload: { id: appNotes?.id, value: target.value }
              },
              type: TYPES.UPDATE_APP_NOTES,
            })
          }
          placeholder={"Enter app description"}
          required
          tooltip="notes"
          value={appNotes?.value}
        />
      </Section>

      <NewAppPageFooterButtons
        disableContinueButton={!appVersion || !appNotes}
        onClickBack={() => onClickBack()}
        onClickContinue={() => {
          saveAndUpdate(
            appVersion?.id,
						"version",
						"Version",
						appVersion?.value,
						TYPES.UPDATE_APP_VERSION);

          saveAndUpdate(
            appNotes?.id,
            "notes",
            "Notes",
            appNotes?.value,
            TYPES.UPDATE_APP_NOTES);

          onClickContinue();
        }}
      />
    </div>
  );
}
