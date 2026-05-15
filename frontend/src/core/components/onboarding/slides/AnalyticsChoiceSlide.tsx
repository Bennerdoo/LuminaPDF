import React from "react";
import { Trans } from "react-i18next";
import { Button } from "@mantine/core";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import i18n from "@app/i18n";
import { SlideConfig } from "@app/types/types";
import { UNIFIED_CIRCLE_CONFIG } from "@app/components/onboarding/slides/unifiedBackgroundConfig";
import styles from "@app/components/onboarding/InitialOnboardingModal/InitialOnboardingModal.module.css";

interface AnalyticsChoiceSlideProps {
  analyticsError?: string | null;
}

export default function AnalyticsChoiceSlide({
  analyticsError,
}: AnalyticsChoiceSlideProps): SlideConfig {
  return {
    key: "analytics-choice",
    title: i18n.t(
      "analytics.title",
      "Do you want to help make Lumina PDF better?",
    ),
    body: (
      <div className={styles.bodyCopyInner}>
        <Trans
          i18nKey="analytics.paragraph1"
          defaults="Lumina PDF has opt-in analytics to help us improve the product. We do not track any personal information or file contents."
          components={{ strong: <strong /> }}
        />
        <br />
        <Trans
          i18nKey="analytics.paragraph2"
          defaults="Please consider enabling analytics to help Lumina-PDF grow and to allow us to understand our users better."
          components={{ strong: <strong /> }}
        />
        <br />

        {analyticsError && (
          <div style={{ color: "var(--mantine-color-red-6)", marginTop: 12 }}>
            {analyticsError}
          </div>
        )}
      </div>
    ),
    background: {
      gradientStops: ["#0EA5E9", "#6366F1"],
      circles: UNIFIED_CIRCLE_CONFIG,
    },
  };
}
