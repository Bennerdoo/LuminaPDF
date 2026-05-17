package lumina.software.SPDF.controller.api;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.Hidden;

import lombok.RequiredArgsConstructor;

import lumina.software.SPDF.config.EndpointConfiguration;
import lumina.software.common.annotations.AutoJobPostMapping;
import lumina.software.common.annotations.api.SettingsApi;
import lumina.software.common.configuration.InstallationPathConfig;
import lumina.software.common.model.ApplicationProperties;
import lumina.software.common.util.GeneralUtils;

@SettingsApi
@RequiredArgsConstructor
@Hidden
public class SettingsController {

    private final ApplicationProperties applicationProperties;
    private final EndpointConfiguration endpointConfiguration;

    @AutoJobPostMapping("/update-enable-analytics")
    @Hidden
    public ResponseEntity<Map<String, Object>> updateApiKey(@RequestParam Boolean enabled)
            throws IOException {
        if (applicationProperties.getSystem().getEnableAnalytics() != null) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
                    .body(
                            Map.of(
                                    "message",
                                    "Setting has already been set, To adjust please edit "
                                            + InstallationPathConfig.getSettingsPath()));
        }
        GeneralUtils.saveKeyToSettings("system.enableAnalytics", enabled);
        applicationProperties.getSystem().setEnableAnalytics(enabled);
        return ResponseEntity.ok(Map.of("message", "Updated"));
    }

    @GetMapping("/get-endpoints-status")
    @Hidden
    public ResponseEntity<Map<String, Boolean>> getDisabledEndpoints() {
        return ResponseEntity.ok(endpointConfiguration.getEndpointStatuses());
    }
}
