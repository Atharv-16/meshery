import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, CatalogIcon, Grid, Switch, Typography, useTheme } from '@layer5/sistent';
import { useGetUserPrefQuery, useUpdateUserPrefMutation } from '@/rtk-query/user';
import { Adapters } from '../components/extensions';
import DefaultError from '@/components/General/error-404';
import { toggleCatalogContent } from '../lib/store';
import { EVENT_TYPES } from '../lib/event-types';
import { EXTENSION_NAMES } from '../utils/Enum';
import { useNotification } from '../utils/hooks/useNotification';
import CAN from '@/utils/can';
import { keys } from '@/utils/permission_constants';
import { LARGE_6_MED_12_GRID_STYLE } from '../css/grid.style';
import { CardContainer, FrontSideDescription, ImageWrapper } from '../css/icons.styles';

const INITIAL_GRID_SIZE = { lg: 6, md: 12, xs: 12 };

const MeshMapSignUpcard = ({ hasAccessToMeshMap = false }) => {
  const handleSignUp = (e) => {
    window.open('https://docs.layer5.io/kanvas', '_blank');
    e.stopPropagation();
  };

  return (
    <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
      <CardContainer>
        <Typography data-testid="kanvas-signup-heading" variant="h5" component="div">
          Kanvas
        </Typography>

        <FrontSideDescription variant="body">
          <ImageWrapper src="/static/img/kanvas-icon-color.svg" />
          Collaboratively design and manage your Kubernetes clusters, service mesh deployments, and
          cloud native apps. Kanvas is now publicly available.{' '}
          {!hasAccessToMeshMap && 'Sign-up today to for access!'}
        </FrontSideDescription>
        {
          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              data-testid="kanvas-signup-btn"
              disabled={hasAccessToMeshMap}
              onClick={(e) => handleSignUp(e)}
            >
              {hasAccessToMeshMap ? 'Enabled' : 'Sign Up'}
            </Button>
          </div>
        }
      </CardContainer>
    </Grid>
  );
};

const MeshMapSnapShotLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '220px',
        maxHeight: '150px',
      }}
      data-testid="kanvas-snapshot-image"
      src="/static/img/meshmap-snapshot-logo.svg"
    />
  );
};

const MeshMapSnapShotCard = ({ githubActionEnabled = false }) => {
  const handleEnable = (e) => {
    window.open('https://cloud.layer5.io/connect/github/new/', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="kanvas-snapshot-heading" variant="h5" component="div">
            GitHub Action: Kanvas Snapshot
          </Typography>

          <FrontSideDescription data-testid="kanvas-snapshot-description" variant="body">
            <MeshMapSnapShotLogo />
            Connect Kanvas to your GitHub repo and see changes pull request-to-pull request. Get
            snapshots of your infrastructure directly in your PRs.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              data-testid="kanvas-snapshot-enable-btn"
              disabled={githubActionEnabled}
              onClick={(e) => handleEnable(e)}
            >
              {githubActionEnabled ? 'Remove' : 'Enable'}
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

const MesheryPerformanceActionLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/smp-dark.svg"
    />
  );
};

const MesheryPerformanceAction = ({ githubActionEnabled = false }) => {
  const handleEnable = (e) => {
    window.open(
      'https://github.com/marketplace/actions/performance-testing-with-meshery',
      '_blank',
    );
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="performance-analysis-heading" variant="h5" component="div">
            GitHub Action: Performance Analysis
          </Typography>

          <FrontSideDescription variant="body">
            <MesheryPerformanceActionLogo />
            Characterize the performance of your services using Meshery&apos;s performance analysis
            GitHub Action to benchmark and visually compare percentiles (e.g. P99) over time.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              data-testid="performance-analysis-enable-btn"
              disabled={githubActionEnabled}
              onClick={(e) => handleEnable(e)}
            >
              {githubActionEnabled ? 'Remove' : 'Enable'}
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

const MesheryDockerExtensionLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/docker.svg"
    />
  );
};

const MesheryDockerExtension = () => {
  const handleDownload = (e) => {
    window.open('https://hub.docker.com/extensions/meshery/docker-extension-meshery', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="docker-extension-heading" variant="h5" component="div">
            Meshery Docker Extension
          </Typography>

          <FrontSideDescription variant="body">
            <MesheryDockerExtensionLogo />
            Connect Meshery to your Kubernetes cluster via Docker Desktop and let MeshSync discover
            your clusters. Use Kanvas&apos;s no-code designer to collaboratively design and manage
            your infrastructure with ready-made patterns from Meshery Catalog.
          </FrontSideDescription>
          {
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                data-testid="docker-extension-download-btn"
                onClick={(e) => handleDownload(e)}
              >
                Download
              </Button>
            </div>
          }
        </CardContainer>
      </Grid>
    </>
  );
};

const MesheryDesignEmbedLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/meshmap.svg"
    />
  );
};

const MesheryDesignEmbedExtension = () => {
  const handleLearnMore = (e) => {
    window.open('https://docs.layer5.io/kanvas/designer/embedding-designs/', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography variant="h5" component="div">
            Meshery Design Embed
          </Typography>

          <FrontSideDescription variant="body">
            <MesheryDesignEmbedLogo />
            Meshery Design Embedding lets you export designs in an interactive format that
            seamlessly integrates with websites, blogs, and platforms using HTML, CSS, and
            JavaScript, making it easy to share with stakeholders.
          </FrontSideDescription>
          {
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                data-testid="design-embed-learn-more-btn"
                onClick={(e) => handleLearnMore(e)}
              >
                Learn More
              </Button>
            </div>
          }
        </CardContainer>
      </Grid>
    </>
  );
};

const Layer5CloudLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/layer5-cloud-icon.svg"
      data-testid="layer5-cloud-image"
    />
  );
};

const Layer5CloudExtension = () => {
  const handleLearnMore = (e) => {
    window.open('https://meshery.io/extensions/layer5-cloud', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="layer5-cloud-heading" variant="h5" component="div">
            Layer5 Cloud
          </Typography>

          <FrontSideDescription variant="body">
            <Layer5CloudLogo />A comprehensive platform offering identity and collaboration
            services, private catalogs, GitOps, and multi-Meshery management. Leverage its
            extensible authorization framework and organizational hierarchy for streamlined cloud
            infrastructure management.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              data-testid="layer5-cloud-learn-more-btn"
              onClick={(e) => handleLearnMore(e)}
            >
              Learn More
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

const HelmPluginLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/helm-icon.svg"
      data-testid="helm-plugin-image"
    />
  );
};

const HelmPluginExtension = () => {
  const handleLearnMore = (e) => {
    window.open('https://meshery.io/extensions/helm-kanvas-snapshot', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="helm-plugin-heading" variant="h5" component="div">
            Helm Plugin for Kanvas Snapshot
          </Typography>

          <FrontSideDescription variant="body">
            <HelmPluginLogo />
            Generate visual snapshots of your Helm charts directly from the command line. Helm
            charts into Kanvas Snapshots with support for both packaged and unpackaged charts.
            Receive snapshots via email or terminal URL display.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              data-testid="helm-plugin-learn-more-btn"
              onClick={(e) => handleLearnMore(e)}
            >
              Learn More
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

const KubectlPluginLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/kubectl-icon.svg"
      data-testid="kubectl-plugin-image"
    />
  );
};

const KubectlPluginExtension = () => {
  const handleLearnMore = (e) => {
    window.open('https://docs.meshery.io/extensions/kubectl-kanvas-snapshot', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="kubectl-plugin-heading" variant="h5" component="div">
            Kubectl Plugin for Kanvas Snapshot
          </Typography>

          <FrontSideDescription variant="body">
            <KubectlPluginLogo />
            Generate visual snapshots of your Kubernetes manifests directly from kubectl. cluster
            configurations and workflows with Kanvas Snapshots. Receive snapshots via email or get
            instant terminal URL display.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              data-testid="kubectl-plugin-learn-more-btn"
              onClick={(e) => handleLearnMore(e)}
            >
              Learn More
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

const KubectlMeshSyncLogo = () => {
  return (
    <img
      style={{
        paddingRight: '1rem',
        height: 'auto',
        width: 'auto',
        maxWidth: '120px',
        maxHeight: '75px',
      }}
      src="/static/img/kubectl-meshsync-icon.svg"
      data-testid="kubectl-meshsync-image"
    />
  );
};

const KubectlMeshSyncExtension = () => {
  const handleLearnMore = (e) => {
    window.open('https://docs.meshery.io/extensions/kubectl-meshsync-snapshot', '_blank');
    e.stopPropagation();
  };

  return (
    <>
      <Grid item {...LARGE_6_MED_12_GRID_STYLE}>
        <CardContainer>
          <Typography data-testid="kubectl-meshsync-heading" variant="h5" component="div">
            Kubectl Plugin for MeshSync Snapshot
          </Typography>

          <FrontSideDescription variant="body">
            <KubectlMeshSyncLogo />
            Capture cluster state directly from kubectl with simplified networking and access
            requirements. Generate MeshSync snapshots for offline management and visualization in
            Meshery Server, without requiring full Meshery Operator deployment.
          </FrontSideDescription>

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              data-testid="kubectl-meshsync-learn-more-btn"
              onClick={(e) => handleLearnMore(e)}
            >
              Learn More
            </Button>
          </div>
        </CardContainer>
      </Grid>
    </>
  );
};

export const WrappedMeshMapSignupCard = MeshMapSignUpcard;
export const WrappedMeshMapSnapShopCard = MeshMapSnapShotCard;
export const WrappedMesheryPerformanceAction = MesheryPerformanceAction;
export const WrappedMesheryDockerExtension = MesheryDockerExtension;
export const WrappedMesheryEmbedDesignExtension = MesheryDesignEmbedExtension;
export const WrappedLayer5CloudExtension = Layer5CloudExtension;
export const WrappedHelmPluginExtension = HelmPluginExtension;
export const WrappedKubectlPluginExtension = KubectlPluginExtension;
export const WrappedKubectlMeshSyncExtension = KubectlMeshSyncExtension;
const Extensions = ({ toggleCatalogContent, capabilitiesRegistry }) => {
  const [catalogContent, setCatalogContent] = useState(true);
  const [extensionPreferences, setExtensionPreferences] = useState({});
  const [hasAccessToMeshMap, setHasAccessToMeshMap] = useState(false);
  const { notify } = useNotification();
  const [updateUserPref] = useUpdateUserPrefMutation();

  const {
    data: userData,
    isSuccess: userDataFetched,
    isError: isUserError,
    error: userError,
  } = useGetUserPrefQuery();

  const handleToggle = () => {
    toggleCatalogContent({ catalogVisibility: !catalogContent });
    setCatalogContent(!catalogContent);
    handleCatalogPreference(!catalogContent);
  };

  const fetchUser = () => {
    if (userDataFetched && userData) {
      setExtensionPreferences(userData?.usersExtensionPreferences);
      setCatalogContent(userData?.usersExtensionPreferences?.catalogContent);
    } else if (isUserError) {
      console.log(userError);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userData]);

  const handleCatalogPreference = (catalogPref) => {
    let body = Object.assign({}, extensionPreferences);
    body['catalogContent'] = catalogPref;
    updateUserPref({ usersExtensionPreferences: body })
      .unwrap()
      .then(() => {
        notify({
          message: `Catalog Content was ${catalogPref ? 'enab' : 'disab'}led`,
          event_type: EVENT_TYPES.SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const meshMapExtensionExists = capabilitiesRegistry?.extensions?.navigator?.filter(
      (val) => val.title.toLowerCase() === EXTENSION_NAMES.KANVAS,
    );
    if (typeof meshMapExtensionExists === 'object' && meshMapExtensionExists.length)
      setHasAccessToMeshMap(true);
  }, []);

  const theme = useTheme();

  return (
    <>
      <React.Fragment>
        <Head>
          <title>Extensions | Meshery</title>
        </Head>
        {CAN(keys.VIEW_EXTENSIONS.action, keys.VIEW_EXTENSIONS.subject) ? (
          <Grid container spacing={1}>
            <WrappedMeshMapSnapShopCard githubActionEnabled={false} />
            <WrappedMesheryPerformanceAction githubActionEnabled={false} />
            <WrappedMeshMapSignupCard hasAccessToMeshMap={hasAccessToMeshMap} />
            <WrappedMesheryDockerExtension />
            <WrappedMesheryEmbedDesignExtension />
            <WrappedLayer5CloudExtension />
            <WrappedHelmPluginExtension />
            <WrappedKubectlPluginExtension />
            <WrappedKubectlMeshSyncExtension />
            <Grid item {...INITIAL_GRID_SIZE}>
              <CardContainer>
                <Typography data-testid="catalog-section-heading" variant="h5" component="div">
                  {'Meshery Catalog'}
                </Typography>

                <FrontSideDescription variant="body">
                  <CatalogIcon
                    data-testid="catalog-toggle-switch"
                    style={{
                      paddingRight: '1rem',
                      height: '80px',
                      width: '80px',
                      flexShrink: 0,
                    }}
                  />

                  <div
                    style={{
                      display: 'inline',
                      position: 'relative',
                    }}
                  >
                    Enable access to the cloud native catalog, supporting design patterns,
                    WebAssembly filters (<span style={{ fontStyle: 'italic' }}>soon</span>), and OPA
                    policies (<span style={{ fontStyle: 'italic' }}>soon</span>). Import any catalog
                    item and customize.
                  </div>
                </FrontSideDescription>

                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  style={{
                    position: 'absolute',
                    paddingRight: '3rem',
                    paddingLeft: '.5rem',
                    bottom: '1.5rem',
                  }}
                >
                  <Typography variant="subtitle2" style={{ fontStyle: 'italic' }}>
                    Explore the{' '}
                    <a
                      href="https://meshery.io/catalog"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: theme.palette.text.brand,
                      }}
                    >
                      Meshery Catalog
                    </a>
                  </Typography>

                  <div style={{ textAlign: 'right' }}>
                    <Switch
                      checked={catalogContent}
                      onChange={handleToggle}
                      name="OperatorSwitch"
                      color="primary"
                    />
                  </div>
                </Grid>
              </CardContainer>
            </Grid>
            <Adapters />
          </Grid>
        ) : (
          <DefaultError />
        )}
      </React.Fragment>
    </>
  );
};

const mapStateToProps = (state) => ({
  catalogVisibility: state.get('catalogVisibility'),
  capabilitiesRegistry: state.get('capabilitiesRegistry'),
});

const mapDispatchToProps = (dispatch) => ({
  toggleCatalogContent: bindActionCreators(toggleCatalogContent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Extensions);
