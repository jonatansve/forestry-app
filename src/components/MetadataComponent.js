import {
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import ActionsTable from "../components/ActionsTable.js";
import EditableTextArea from "../components/EditableTextArea.js";
import EditableTextField from "../components/EditableTextField.js";
import TreeDistCharts from "../components/TreeDistCharts.js";
import ClassPopoverInfo from "../utils/ClassPopoverInfo.js";
import { getDocument, getCollection, updateDocument } from "../utils/firestore.js";

const Root = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  flexGrow: 1,
}));

const StyledCard = styled(Card)({
  width: "100%",
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Title = styled(Typography)({
  fontSize: 14,
  textAlign: "left",
});

const ClassTitle = styled(Typography)({
  textAlign: "left",
});

const MetadataComponent = ({ dataParentToChild }) => {
  const [metaData, setMetaData] = useState({
    general: {},
    distribution: {},
    notes: "",
    description: {},
  });
  const [actionData, setActionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalClass, setGoalClass] = useState("");
  const [chopClassVal, setChopClassVal] = useState("");

  useEffect(() => {
    if (dataParentToChild) {
      const fetchData = async () => {
        try {
          const data = await getDocument("data", dataParentToChild.toString());
          if (data) {
            setMetaData(data);
            setGoalClass(data.general.class);
            setChopClassVal(data.description.type);
            setLoading(false);
          }

          const actions = await getCollection(`data/${dataParentToChild.toString()}/actions`);
          setActionData(actions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [dataParentToChild]);

  metaData["actions"] = actionData;

  const editableData = async (value, path) => {
    if (path) {
      let parentObject = path.split(".")[0];
      let childObject = path.split(".")[1];
      let dbData = {};
      let child = {};
      let numberValue = -1;
      let isString = isNaN(parseInt(value));

      if (!isString) {
        numberValue = parseInt(value);
      }

      if (!childObject) {
        dbData[parentObject] = value;
      } else {
        child[childObject] = isString ? value : numberValue;
        dbData[parentObject] = child;
      }

      try {
        await updateDocument("data", dataParentToChild.toString(), dbData);
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  const handleGoalClassChange = async (event) => {
    try {
      await updateDocument("data", dataParentToChild.toString(), {
        description: { type: event.target.value }
      });
      setLoading(false);
      console.log("Document successfully updated!");
      setGoalClass(event.target.value);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleChopClassChange = async (event) => {
    try {
      await updateDocument("data", dataParentToChild.toString(), {
        general: { class: event.target.value }
      });
      setLoading(false);
      console.log("Document successfully updated!");
      setChopClassVal(event.target.value);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Root>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Root>
          <Container maxWidth="md">
            <Grid container spacing={3} justifyContent="center">
              <Typography variant="h3">{metaData.general.name}</Typography>
              <Grid item sm={12}>
                <Typography variant="h5">
                  {metaData.general.area} hektar
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <StyledCard>
                  <CardContent>
                    <EditableTextField
                      editableData={editableData}
                      name={"general.goal"}
                      value={metaData.general.goal}
                      label="Produktionsmål"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.age"}
                      value={metaData.description.age}
                      label="Snittålder"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.index"}
                      value={metaData.description.index}
                      label="Ståndortsindex"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.volume"}
                      value={metaData.description.volume}
                      label="Volym (m3sk)"
                    />
                    <EditableTextField
                      editableData={editableData}
                      name={"description.totVolume"}
                      value={metaData.description.totVolume}
                      label="Total volym (m3sk/bestånd)"
                    />
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item sm={3}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <StyledFormControl margin="none">
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Målklass
                    </InputLabel>
                    <StyledSelect
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={goalClass ? goalClass : ""}
                      displayEmpty
                      onChange={handleGoalClassChange}
                    >
                      <MenuItem value={"PG"}>PG</MenuItem>
                      <MenuItem value={"PFK"}>PF (K)</MenuItem>
                      <MenuItem value={"NO"}>NO</MenuItem>
                      <MenuItem value={"NS"}>NS</MenuItem>
                    </StyledSelect>
                  </StyledFormControl>
                  <ClassPopoverInfo popType={1} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <StyledFormControl>
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Huggningsklass
                    </InputLabel>
                    <StyledSelect
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={chopClassVal ? chopClassVal : ""}
                      displayEmpty
                      onChange={handleChopClassChange}
                    >
                      <MenuItem value={"K1"}>K1</MenuItem>
                      <MenuItem value={"K2"}>K2</MenuItem>
                      <MenuItem value={"R1"}>R1</MenuItem>
                      <MenuItem value={"R2"}>R2</MenuItem>
                      <MenuItem value={"G1"}>G1</MenuItem>
                      <MenuItem value={"G2"}>G2</MenuItem>
                      <MenuItem value={"S1"}>S1</MenuItem>
                      <MenuItem value={"S2"}>S2</MenuItem>
                      <MenuItem value={"S3"}>S3</MenuItem>
                    </StyledSelect>
                  </StyledFormControl>
                  <ClassPopoverInfo popType={2} />
                </div>
              </Grid>
              <TreeDistCharts data={metaData.distribution} />

              <Grid item sm={10}>
                <EditableTextArea
                  editableData={editableData}
                  name={"notes"}
                  value={metaData.notes}
                />
              </Grid>
              <Grid item sm={10}>
                <ActionsTable
                  actionData={metaData.actions}
                  areaId={dataParentToChild.toString()}
                />
              </Grid>
            </Grid>
          </Container>
        </Root>
      )}
    </Root>
  );
};

export default MetadataComponent;
