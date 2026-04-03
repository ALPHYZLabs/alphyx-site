export default function Disclaimer({ variant = "default" }) {
  if (variant === "footer") {
    return (
      <p className="text-[11px] text-white/30 leading-relaxed text-center">
        © 2026 ALPHYX Labs. All products are intended for research purposes only.
        Not for human consumption. Not for use by individuals who are pregnant or breastfeeding.
      </p>
    )
  }

  if (variant === "compact") {
    return (
      <p className="text-xs text-white/40 mt-4 leading-relaxed">
        Research purposes only. Not for human consumption. Not for use by pregnant or breastfeeding individuals.
      </p>
    )
  }

  return (
    <p className="text-xs text-white/40 mt-4 leading-relaxed">
      All products and content are provided strictly for research purposes only.
      Not for human consumption. Not for use by individuals who are pregnant or breastfeeding.
    </p>
  )
}