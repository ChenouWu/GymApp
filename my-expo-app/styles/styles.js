// styles.js
import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const cardWidth = (width - 50) / 2

const styles = StyleSheet.create({
  /* ========== Index(首页, 黑底) ========== */
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  container: { paddingHorizontal: 24 },
  header: { alignItems: "center", marginBottom: 48 },
  headerText: { fontSize: 50, fontWeight: "800", color: "#000", letterSpacing: 1 },
  subtitleContainer: { marginBottom: 48 },
  subtitleText: { textAlign: "center", color: "#000", fontSize: 18 },
  actions: { gap: 16 },
  primaryButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#000", paddingVertical: 16, borderRadius: 16,
  },
  primaryButtonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  iconRight: { marginLeft: 8 },
  logoutButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    borderColor: "#d1d5db", borderWidth: 1, paddingVertical: 12, borderRadius: 16, marginTop: 12,
  },
  logoutText: { color: "#fff", fontSize: 16 },
  iconLeft: { marginRight: 8 },

  /* ========== Home(网格列表, 白底) ========== */
  homeScreen: { flex: 1, backgroundColor: "#fff", padding: 20 },
  homeTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#111" },

  gridContainer: { paddingBottom: 20 },
  gridRow: { justifyContent: "space-between", marginBottom: 16 },
  gridCard: {
    width: cardWidth, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden",
    borderWidth: 1, borderColor: "#e5e5e5",
    shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  gridCardImage: { width: "100%", height: 120, resizeMode: "cover" },
  gridCardContent: { padding: 12 },
  gridCardTitle: { fontSize: 16, fontWeight: "700", color: "#222", marginBottom: 6 },
  gridCardDescription: { fontSize: 14, color: "#666", lineHeight: 18, marginBottom: 10 },
  gridCardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },

  statItem: { flexDirection: "row", alignItems: "center" },
  statText: { fontSize: 12, color: "#666", marginLeft: 4 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, backgroundColor: "#e8e8e8" },
  categoryText: { fontSize: 10, color: "#333", fontWeight: "600" },

  emptyContainer: { alignItems: "center", justifyContent: "center", padding: 40 },
  emptyText: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 15 },
  emptySubtext: { fontSize: 14, color: "#666", marginTop: 5, textAlign: "center" },

  /* ========== Create(创建/编辑表单, 白底) ========== */
  createScreen: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },

  formHeader: { marginTop: 24, marginBottom: 8 },
  formHeaderTitle: { fontSize: 22, fontWeight: "700", color: "#111" },
  formHeaderSubtitle: { fontSize: 13, color: "#6b6b6b", marginTop: 4 },

  block: { marginTop: 16 },
  blockLg: { marginTop: 24 },

  label: { fontSize: 15, fontWeight: "600", color: "#2b2b2b", marginBottom: 8 },

  inputRow: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    paddingHorizontal: 12, backgroundColor: "#f5f5f5", minHeight: 52,
  },
  input: { flex: 1, fontSize: 16, color: "#111", paddingVertical: 12, marginLeft: 8 },

  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 13, color: "#666", marginBottom: 6 },

  row: { flexDirection: "row", alignItems: "center" },
  col: { flex: 1 },

  inputBox: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, color: "#111", backgroundColor: "#fff",
  },

  exerciseCard: {
    backgroundColor: "#f9f9f9", borderRadius: 16, borderWidth: 1, borderColor: "#e6e6e6",
    padding: 16, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  exerciseHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  exerciseTitle: { color: "#111", fontWeight: "700" },
  trashBtn: { backgroundColor: "#111", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },

  textareaRow: {
    flexDirection: "row", alignItems: "flex-start",
    borderWidth: 1, borderColor: "#ddd", borderRadius: 12,
    paddingHorizontal: 12, backgroundColor: "#f5f5f5", minHeight: 112,
  },
  textarea: { flex: 1, fontSize: 16, color: "#111", paddingVertical: 12, marginLeft: 8, minHeight: 112 },

  addBtn: {
    marginTop: 6, backgroundColor: "#000", borderRadius: 12, paddingVertical: 12,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
  },
  addBtnText: { color: "#fff", fontWeight: "600", marginLeft: 8 },

  imageRow: { flexDirection: "row", flexWrap: "wrap" },
  imageWrap: { marginRight: 8, marginBottom: 8, position: "relative" },
  image: { width: 96, height: 96, borderRadius: 10, backgroundColor: "#f0f0f0" },
  editFab: { position: "absolute", right: 4, bottom: 4, backgroundColor: "#fff", borderRadius: 999, padding: 6 },
  imagePicker: {
    width: 96, height: 96, borderRadius: 10, borderWidth: 1, borderColor: "#ddd",
    borderStyle: "dashed", backgroundColor: "#f5f5f5", alignItems: "center", justifyContent: "center",
  },

  submitBtn: { marginTop: 24, backgroundColor: "#000", borderRadius: 12, paddingVertical: 14, alignItems: "center", justifyContent: "center" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  /* ========== Profile(个人页, 白底) ========== */
  profileScreen: { flex: 1, backgroundColor: "#fff" },
  section: { paddingHorizontal: 20, marginTop: 12 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  textMuted: { color: "#666", fontSize: 14 },
  textSubtle: { color: "#888", fontSize: 13 },
  textDanger: { color: "#ff3b30", fontSize: 14 },

  btnOutlineSm: {
    borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: "#fff",
  },
  btnPrimarySm: { backgroundColor: "#000", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },

  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#e5e5e5" },
  userName: { fontSize: 18, fontWeight: "700", color: "#111" },

  statCard: {
    flex: 1, backgroundColor: "#f7f7f7", borderRadius: 16, borderWidth: 1, borderColor: "#e6e6e6",
    paddingVertical: 16, alignItems: "center",
  },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#111" },

  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  chipDefault: { backgroundColor: "#fff", borderColor: "#d1d5db" },
  chipActive: { backgroundColor: "#000", borderColor: "#000" },
  chipText: { fontSize: 13, fontWeight: "600" },
  chipTextDefault: { color: "#444" },
  chipTextActive: { color: "#fff" },

  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111" },

  emptyBox: { alignItems: "center", justifyContent: "center", paddingVertical: 48 },

  fab: {
    position: "absolute", right: 24, bottom: 24, width: 56, height: 56, borderRadius: 28,
    backgroundColor: "#000", alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },

  // Profile 卡片（大图）
  cardWrap: { marginBottom: 20 },
  cardTouchable: { borderRadius: 16, overflow: "hidden" },
  cardImageBg: { width: "100%", height: 220, justifyContent: "flex-end" },
  cardImage: { resizeMode: "cover" },
  cardTopActions: { position: "absolute", top: 12, right: 12, flexDirection: "row" },
  iconPill: { backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 8 },
  cardTitleBox: { padding: 12 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  badgeGhost: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeGhostText: { color: "#fff", fontSize: 12 },

  cardMeta: { paddingHorizontal: 4, marginTop: 8 },
  cardNotes: { color: "#444", fontSize: 14, lineHeight: 20 },
  /* ========== Workout Detail(深色) ========== */
detailScreen: { flex: 1, backgroundColor: "#000" },
detailScrollContent: { paddingBottom: 24 },
detailBody: { paddingHorizontal: 20, paddingTop: 16 },

detailLoading: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
detailLoadingText: { color: "#a1a1aa", marginTop: 8 },

detailNotFound: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
detailNotFoundTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 12 },
detailBackBtn: { marginTop: 16, borderRadius: 16, backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 12 },
detailBackBtnText: { color: "#000", fontWeight: "600" },

detailHeaderBar: {
  position: "absolute", top: 0, left: 0, right: 0, height: 56, zIndex: 10,
  backgroundColor: "rgba(24,24,27,0.8)", flexDirection: "row", alignItems: "center", paddingHorizontal: 12,
},
detailHeaderIconBtn: { padding: 8 },
detailHeaderTitle: { flex: 1, color: "#fff", fontWeight: "600", fontSize: 16, marginLeft: 8 },

detailRoundBtn: {
  height: 40, width: 40, borderRadius: 20,
  backgroundColor: "#18181b", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27272a",
},

detailProfileCard: {
  marginTop: 20, padding: 16, borderRadius: 16,
  backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", flexDirection: "row", alignItems: "center",
},
detailAvatar: { height: 48, width: 48, borderRadius: 24, backgroundColor: "#27272a" },
detailCreatorName: { color: "#fff", fontWeight: "700" },
detailCreatorRole: { color: "#a1a1aa", fontSize: 12 },
detailFollowBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: "#fff" },
detailFollowBtnText: { color: "#000", fontSize: 12, fontWeight: "700" },

detailTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
detailMetaText: { color: "#a1a1aa", marginLeft: 4 },

detailGalleryImage: { width: "100%", height: 256, borderRadius: 16, backgroundColor: "#0a0a0a" },
detailDotsRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 },
detailDot: { height: 8, width: 8, borderRadius: 4, backgroundColor: "#52525b", marginHorizontal: 3 },
detailDotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#fff" },

detailStatsRow: { marginTop: 24, flexDirection: "row", columnGap: 12 },
detailStatCard: {
  flex: 1, paddingVertical: 16, borderRadius: 16, backgroundColor: "#18181b",
  borderWidth: 1, borderColor: "#27272a", alignItems: "center",
},
detailStatNumber: { color: "#fff", fontSize: 20, fontWeight: "800" },
detailStatLabel: { color: "#a1a1aa", fontSize: 12, marginTop: 4 },

detailSectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
detailNotesCard: { marginTop: 8, padding: 16, borderRadius: 16, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a" },
detailNotesText: { color: "#d4d4d8" },

detailExerciseItem: { marginTop: 12, padding: 16, borderRadius: 16, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a" },
detailExerciseIndex: { height: 28, width: 28, borderRadius: 14, backgroundColor: "#27272a", alignItems: "center", justifyContent: "center" },
detailExerciseIndexText: { color: "#d4d4d8", fontSize: 12, fontWeight: "700" },
detailExerciseName: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
detailExerciseLabel: { color: "#a1a1aa", fontSize: 12 },
detailExerciseValue: { color: "#fff", fontWeight: "700", marginTop: 2 },

detailCommentAvatar: { height: 36, width: 36, borderRadius: 18, backgroundColor: "#27272a" },
detailCommentInputRow: {
  flexDirection: "row", alignItems: "flex-end",
  backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 8,
},
detailCommentInput: { flex: 1, color: "#fff", minHeight: 40, fontSize: 14 },
detailSendBtn: { marginLeft: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: "#fff" },
detailSendBtnDisabled: { backgroundColor: "#3f3f46" },

detailCommentUsername: { color: "#fff", fontWeight: "700" },
detailCommentDate: { color: "#a1a1aa", fontSize: 12 },
detailCommentText: { color: "#d4d4d8", marginTop: 4 },
detailCommentAction: { flexDirection: "row", alignItems: "center" },
detailCommentActionText: { color: "#a1a1aa", fontSize: 12, marginLeft: 4 },

detailNoComments: { alignItems: "center", justifyContent: "center", marginTop: 24 },
detailNoCommentsTitle: { color: "#d4d4d8", marginTop: 8 },
detailNoCommentsSubtitle: { color: "#a1a1aa", fontSize: 12 },
/* ========== Signup(注册页, 白底) ========== */
signupScreen: { flex: 1, backgroundColor: "#fff" },
signupScroll: { flex: 1 },
signupScrollContent: { paddingHorizontal: 24, paddingVertical: 16 },

signupLogoWrap: { alignItems: "center", marginBottom: 16 },
signupAppName: { fontSize: 28, fontWeight: "bold", color: "#111" },

signupHeader: { marginBottom: 12 },
signupTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
signupSubtitle: { color: "#666", marginTop: 4 },

signupBlock: { marginBottom: 14 },
signupLabel: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 8 },

signupInputRow: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  paddingHorizontal: 12,
  backgroundColor: "#f9f9f9",
  minHeight: 52,
},
signupInput: {
  flex: 1,
  fontSize: 16,
  color: "#000",
  paddingVertical: 12,
  marginLeft: 8,
},
signupIconBtn: { padding: 4, marginLeft: 6 },

signupPrimaryBtn: {
  backgroundColor: "#000",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 4,
},
signupPrimaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

signupDividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
signupDivider: { flex: 1, height: 1, backgroundColor: "#ddd" },
signupDividerText: { paddingHorizontal: 8, color: "#666" },

signupSocialRow: { flexDirection: "row", justifyContent: "center", gap: 12 },
signupSocialBtn: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#fff",
  marginHorizontal: 6,
},
signupSocialText: { marginLeft: 8, color: "#333", fontWeight: "500" },

signupSwitchRow: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
signupSwitchText: { color: "#666" },
signupSwitchLink: { color: "#000", fontWeight: "700" },
/* ========== Login(登录页, 白底) ========== */
loginScreen: { flex: 1, backgroundColor: "#fff" },
scrollContainer: { paddingHorizontal: 24, paddingVertical: 16 },

logoContainer: { alignItems: "center", marginBottom: 16 },
appName: { fontSize: 28, fontWeight: "bold", color: "#111" },

formContainer: { marginTop: 8 },

inputContainer: { marginBottom: 14 },
inputLabel: { fontSize: 13, fontWeight: "600", color: "#333", marginBottom: 8 },
inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  paddingHorizontal: 12,
  backgroundColor: "#f9f9f9",
  minHeight: 52,
},
inputIcon: { marginRight: 8 },
input: { flex: 1, fontSize: 16, color: "#000", paddingVertical: 12 },
eyeIcon: { padding: 4, marginLeft: 6 },

forgotPasswordContainer: { alignItems: "flex-end", marginTop: 4, marginBottom: 8 },
forgotPasswordText: { color: "#444", fontWeight: "600" },

primaryButton: {
  backgroundColor: "#000",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 4,
},
primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
disabledButton: { opacity: 0.6 },

dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
divider: { flex: 1, height: 1, backgroundColor: "#ddd" },
dividerText: { paddingHorizontal: 8, color: "#666" },

socialButtonsContainer: { flexDirection: "row", justifyContent: "center" },
socialButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#fff",
  marginHorizontal: 6,
},
socialButtonText: { marginLeft: 8, color: "#333", fontWeight: "500" },

switchFormContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
switchFormText: { color: "#666" },
switchFormLink: { color: "#000", fontWeight: "700" },

})

export default styles
