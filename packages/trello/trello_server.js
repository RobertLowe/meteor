// https://api.trello.com/1/members/me
Trello.whitelistedFields = [
  "id",
  "avatarHash",
  "bio",
  "confirmed",
  "fullName",
  "idPremOrgsAdmin",
  "initials",
  "memberType",
  "status",
  "url",
  "username",
  "avatarSource",
  "email",
  "gravatarHash",
  "idBoards",
  "idBoardsInvited",
  "idBoardsPinned",
  "idOrganizations",
  "idOrganizationsInvited",
  "loginTypes",
  "newEmail",
  "oneTimeMessagesDismissed",
  "prefs",
  "trophies",
  "uploadedAvatarHash"
]

Oauth.registerService('trello', 1, Trello._urls, function(oauthBinding) {
  var identity = oauthBinding.get('https://api.trello.com/1/members/me').data;

  var serviceData = {
    id: identity.id,
    screenName: identity.username,
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };
  
  // include helpful fields from trello
  var fields = _.pick(identity, Trello.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        trello: identity
      }
    }
  };
});


Trello.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};