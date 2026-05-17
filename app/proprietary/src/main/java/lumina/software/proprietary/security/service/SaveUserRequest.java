package lumina.software.proprietary.security.service;

import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;

import lumina.software.common.model.enumeration.Role;
import lumina.software.proprietary.model.Team;
import lumina.software.proprietary.security.model.AuthenticationType;

/**
 * Carries all attributes required to create or update a user account, including credentials,
 * SSO/provider details, team association, role and MFA configuration. Used by the security service
 * layer to persist or update users.
 *
 * <p>Defaults:
 *
 * <ul>
 *   <li>password: null
 *   <li>ssoProviderId: null
 *   <li>ssoProvider: null
 *   <li>authenticationType: {@code AuthenticationType.WEB}
 *   <li>teamId: null
 *   <li>team: null
 *   <li>role: {@code Role.USER.getRoleId()}
 *   <li>firstLogin: false
 *   <li>enabled: true
 *   <li>requireMfa: false
 *   <li>mfaEnabled: false
 *   <li>mfaSecret: null
 *   <li>mfaLastUsedStep: null
 * </ul>
 */
@Getter
@Builder(builderClassName = "Builder")
public class SaveUserRequest {
    private final String username;
    @Default private final String password = null;
    @Default private final String ssoProviderId = null;
    @Default private final String ssoProvider = null;
    @Default private final AuthenticationType authenticationType = AuthenticationType.WEB;
    @Default private final Long teamId = null;
    @Default private final Team team = null;
    @Default private final String role = Role.USER.getRoleId();
    @Default private final boolean firstLogin = false;
    @Default private final boolean enabled = true;
    @Default private final boolean requireMfa = false;
    @Default private final boolean mfaEnabled = false;
    @Default private final String mfaSecret = null;
    @Default private final Long mfaLastUsedStep = null;
}
