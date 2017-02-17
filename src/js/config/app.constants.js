const AppConstants = {};

AppConstants.appName = "e-Praças";

AppConstants.jwtKey = "id_token";
AppConstants.idcultura_url = "/* @echo IDCULTURA_URL */";
AppConstants.issuerUri = AppConstants.idcultura_url.replace("https", "http");
AppConstants.loginUrl = `${AppConstants.idcultura_url}/openid/connect/authorize`;
AppConstants.userinfoUrl = `${AppConstants.idcultura_url}/api/v1/person`;
AppConstants.clientId = "/* @echo IDCULTURA_CLIENTID */";
AppConstants.logoutUrl = `${AppConstants.idcultura_url}/openid/connect/session/end?post_logout_redirect_uri=`;

AppConstants.api = "/* @echo EPRACAS_API_URL */";
AppConstants.apiUserInfo = `${AppConstants.api}/user/`;
AppConstants.agendaApi = `${AppConstants.api}/atividades/`;
AppConstants.vinculoEndPoint = `${AppConstants.api}/processo/`;

export default AppConstants;
