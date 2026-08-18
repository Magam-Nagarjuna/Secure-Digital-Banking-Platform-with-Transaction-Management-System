
const loginStyles = {
    grid: {
        width: "100%",
        maxWidth: "1080px",
        display: "grid",
        gridTemplateColumns: "minmax(320px, 0.9fr) minmax(420px, 1.1fr)",
        gap: "28px",
        alignItems: "stretch",
    },

    promoPanel: {
        minHeight: "600px",
        borderRadius: "22px",
        padding: "42px 38px",
        boxSizing: "border-box",
        background: "linear-gradient(145deg,#0759b5,#1976d2)",
        color: "#ffffff",
        boxShadow: "0 18px 40px rgba(14,93,180,.20)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    promoLogoBadge: {
        width: "62px",
        height: "62px",
        borderRadius: "15px",
        border: "1px solid rgba(255,255,255,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "50px",
        background: "rgba(255,255,255,.08)",
    },

    promoLogoImg: {
        width: "45px",
        height: "45px",
        objectFit: "contain",
        filter: "brightness(0) invert(1)",
    },

    promoEyebrow: {
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        opacity: ".78",
        marginBottom: "15px",
    },

    promoHeading: {
        margin: 0,
        fontSize: "38px",
        lineHeight: "1.18",
        fontWeight: "800",
        maxWidth: "430px",
    },

    promoText: {
        marginTop: "22px",
        fontSize: "15px",
        lineHeight: "1.8",
        color: "rgba(255,255,255,.82)",
        maxWidth: "400px",
    },

    promoFeatureList: {
        position: "relative",
        zIndex: 2,
        marginTop: "50px",
    },

    promoFeatureRow: (isLast) => ({
        display: "flex",
        alignItems: "center",
        gap: "11px",
        marginBottom: isLast ? 0 : "15px",
    }),

    promoFeatureIcon: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: "rgba(255,255,255,.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "800",
    },

    promoFeatureText: {
        fontSize: "13px",
        color: "rgba(255,255,255,.85)",
    },

    promoDecorationOuter: {
        position: "absolute",
        width: "300px",
        height: "300px",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: "50%",
        right: "-140px",
        bottom: "-130px",
    },

    promoDecorationInner: {
        position: "absolute",
        width: "190px",
        height: "190px",
        border: "1px solid rgba(255,255,255,.10)",
        borderRadius: "50%",
        right: "-70px",
        bottom: "-70px",
    },

    authCard: {
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "22px",
        padding: "42px",
        boxSizing: "border-box",
        boxShadow: "0 12px 35px rgba(20,40,80,.07)",
        alignSelf: "center",
    },

    authCardHeader: {
        borderBottom: "1px solid #e7ebf1",
        paddingBottom: "25px",
        marginBottom: "30px",
    },

    authCardEyebrow: {
        color: "#0864c7",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "8px",
    },

    authCardTitle: {
        margin: 0,
        color: "#172238",
        fontSize: "30px",
        fontWeight: "800",
    },

    authCardSubtitle: {
        margin: "8px 0 0",
        color: "#8794a8",
        fontSize: "14px",
        lineHeight: "1.6",
    },

    footerRow: {
        marginTop: "25px",
        paddingTop: "23px",
        borderTop: "1px solid #edf0f4",
        textAlign: "center",
        fontSize: "14px",
    },

    footerMuted: {
        color: "#7b8799",
    },

    secureNote: {
        textAlign: "center",
        marginTop: "24px",
        color: "#a0abba",
        fontSize: "11px",
    },

    registerHeaderRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
    },

    registerHeaderMuted: {
        color: "#7c899d",
    },

    registerSignInPill: {
        border: "none",
        background: "#eff5ff",
        color: "#0864c7",
        padding: "9px 16px",
        borderRadius: "9px",
        fontWeight: "700",
        cursor: "pointer",
    },

    registerMain: {
        flex: 1,
        maxWidth: "1250px",
        width: "100%",
        margin: "0 auto",
        padding: "42px 30px 70px",
        boxSizing: "border-box",
    },

    registerIntro: {
        marginBottom: "30px",
    },

    registerEyebrow: {
        color: "#0864c7",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "7px",
    },

    registerHeading: {
        margin: 0,
        color: "#172238",
        fontSize: "32px",
        fontWeight: "800",
    },

    registerSubheading: {
        marginTop: "8px",
        marginBottom: 0,
        color: "#7b8aa1",
        fontSize: "15px",
    },

    registerGrid: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, .78fr) minmax(550px, 1.35fr)",
        gap: "28px",
        alignItems: "start",
    },

    registerPromoPanel: {
        minHeight: "410px",
        borderRadius: "20px",
        padding: "40px 32px",
        boxSizing: "border-box",
        background: "linear-gradient(145deg,#0759b5,#1976d2)",
        color: "#ffffff",
        boxShadow: "0 18px 35px rgba(14,93,180,.20)",
        position: "relative",
        overflow: "hidden",
    },

    registerPromoLogoBadge: {
        width: "58px",
        height: "58px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "43px",
        background: "rgba(255,255,255,.08)",
    },

    registerPromoLogoImg: {
        width: "42px",
        height: "42px",
        objectFit: "contain",
        filter: "brightness(0) invert(1)",
    },

    registerPromoEyebrow: {
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        opacity: ".75",
        marginBottom: "14px",
    },

    registerPromoHeading: {
        fontSize: "30px",
        lineHeight: "1.2",
        margin: 0,
        fontWeight: "800",
    },

    registerPromoText: {
        marginTop: "20px",
        fontSize: "14px",
        lineHeight: "1.7",
        color: "rgba(255,255,255,.82)",
    },

    registerPromoDecoration: {
        position: "absolute",
        width: "230px",
        height: "230px",
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: "50%",
        right: "-90px",
        bottom: "-90px",
    },

    registerSecurityCard: {
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "18px",
        padding: "25px",
        marginTop: "20px",
        boxShadow: "0 8px 25px rgba(20,40,80,.05)",
    },

    registerSecurityRow: (isLast) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: isLast ? 0 : "18px",
    }),

    registerSecurityIcon: {
        width: "23px",
        height: "23px",
        borderRadius: "50%",
        background: "#eaf8f0",
        color: "#15935a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "800",
    },

    registerSecurityText: {
        fontSize: "13px",
        color: "#687992",
    },

    registerFormCard: {
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "20px",
        padding: "38px 40px",
        boxSizing: "border-box",
        boxShadow: "0 12px 35px rgba(20,40,80,.06)",
    },

    registerFormHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: "1px solid #e7ebf1",
        paddingBottom: "25px",
        marginBottom: "28px",
    },

    registerFormEyebrow: {
        color: "#0864c7",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "8px",
    },

    registerFormTitle: {
        margin: 0,
        color: "#172238",
        fontSize: "25px",
        fontWeight: "800",
    },

    registerFormSubtitle: {
        margin: "6px 0 0",
        color: "#8794a8",
        fontSize: "14px",
    },

    registerFormBadge: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#eff5ff",
        color: "#0963c5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "13px",
    },

    registerSuccessBanner: {
        background: "#ecfdf3",
        border: "1px solid #bcebd0",
        borderRadius: "12px",
        padding: "15px 18px",
        marginBottom: "25px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    registerSuccessIcon: {
        width: "31px",
        height: "31px",
        borderRadius: "50%",
        background: "#d8f7e6",
        color: "#159455",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        flexShrink: 0,
    },

    registerSuccessTitle: {
        fontWeight: "700",
        color: "#167346",
        fontSize: "14px",
    },

    registerSuccessSubtitle: {
        fontSize: "12px",
        color: "#4d7b62",
        marginTop: "3px",
    },

    registerHelpText: {
        marginTop: "7px",
        fontSize: "11px",
        color: "#9aa7ba",
    },

    registerSecureFooter: {
        textAlign: "center",
        marginTop: "18px",
        color: "#9aa7ba",
        fontSize: "12px",
    },
};

export default loginStyles;
