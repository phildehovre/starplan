import React, { useEffect } from "react";
import RessourceLayout from "../layouts/RessourceLayout";
import { Outlet, useParams } from "react-router";
import RessourceHeader from "../components/RessourceHeader-REFACTOR";
import { useCampaign, useTemplate } from "../util/db";
import Spinner from "../components/Spinner";

function RessourcePage() {
  const { ressource: ressourceType, id } = useParams();

  const [ressource, setRessource] = React.useState<any>(undefined);

  const { data: templateData } = useTemplate(
    id,
    ressourceType === "template" && id ? true : false
  );

  const { data: campaignData } = useCampaign(
    id,
    ressourceType === "campaign" && id ? true : false
  );

  useEffect(() => {
    setRessource(ressourceType === "template" ? templateData : campaignData);
  }, [ressourceType, templateData, campaignData]);

  const headerProps = {
    ressource: ressourceType === "template" ? templateData : campaignData,
    ressourceType: ressourceType,
  };

  return (
    <>
      {!ressource && <Spinner />}
      {ressource && (
        <RessourceLayout
          header={<RessourceHeader {...headerProps} />}
          outlet={<Outlet />}
        />
      )}
    </>
  );
}

export default RessourcePage;
