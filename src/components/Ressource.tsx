import React, { useContext, useEffect } from "react";
import { useCampaignEvents, useTemplateEvents } from "../util/db";
import { useParams } from "react-router";
import { useSession } from "@supabase/auth-helpers-react";
import Table from "./Table";
import {
  convertPositionToDate,
  convertTemplatePositionForSorting,
} from "../utils/helpers";
import { Select } from "@radix-ui/react-select";
import { selectedCampaignContext } from "../contexts/SelectedCampaignContext";

function Ressource() {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  const { ressource: ressourceType, id: ressourceId } = useParams();
  const session = useSession();
  const params = useParams();

  const newTemplateId = "a1a5a75d-9d1e-4f5b-b23e-4d6918dcc434";
  const newCampaignId = "b1a5a75d-9d1e-4f5b-b23e-4d6918dcc434";

  const [templateId, setTemplateId] = React.useState<string | undefined>(
    undefined
  );
  const [campaignId, setCampaignId] = React.useState<string | undefined>(
    undefined
  );
  const [formattedCampaignEvents, setFormattedCampaignEvents] =
    React.useState<any>({ data: { data: [] } });
  const [formattedTemplateEvents, setFormattedTemplateEvents] =
    React.useState<any>({ data: { data: [] } });

  useEffect(() => {
    if (ressourceType === "template" && params.id) {
      setTemplateId(ressourceId);
    }
    if (ressourceType === "template" && !params.id) {
      setTemplateId(newTemplateId);
    }
    if (ressourceType === "campaign") {
      setCampaignId(ressourceId);
    }
    if (ressourceType === "campaign" && !params.id) {
      setCampaignId(newCampaignId);
    }
  }, [ressourceType, ressourceId, session]);

  const templateEvents = useTemplateEvents(templateId);
  const campaignEvents = useCampaignEvents(campaignId);

  const { campaignData } = useContext(selectedCampaignContext);

  useEffect(() => {
    if (templateEvents?.data?.data) {
      const newArray = templateEvents?.data?.data
        ?.map((event: any) => {
          return {
            ...event,
            sorting_position: convertTemplatePositionForSorting(event),
          };
        })
        .sort((a: any, b: any) => b.sorting_position - a.sorting_position);
      setFormattedTemplateEvents((prev: any) => {
        return { ...prev, data: { data: [...newArray] } };
      });
    }
  }, [templateEvents?.data?.data]);

  useEffect(() => {
    if (campaignEvents?.data?.data) {
      const sortedEvents = campaignEvents?.data?.data.sort((a: any, b: any) => {
        return b.position - a.position;
      });
      const formattedEvents = sortedEvents.map((event: any) => {
        return {
          ...event,
          targetDate: campaignData?.targetDate,
          // position: convertPositionToDate(
          //   event.position,
          //   event.position_units,
          //   campaignData?.targetDate
          // ),
        };
      });
      setFormattedCampaignEvents((prev: any) => {
        return { ...prev, data: { data: [...formattedEvents] } };
      });
    }
  }, [campaignEvents?.data?.data]);

  return (
    <div>
      <Table
        ressource={
          ressourceType === "template"
            ? formattedTemplateEvents
            : formattedCampaignEvents
        }
        ressourceType={ressourceType}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}

export default Ressource;
