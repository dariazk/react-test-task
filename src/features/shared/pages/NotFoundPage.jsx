import React from "react"
import PageLayout from "../layouts/PageLayout"

export default function NotFoundPage({
  title = "Товар не найден",
  backTo = "/",
  backLabel = "Назад к каталогу",
}) {
  return (
    <PageLayout title={title} backTo={backTo} backLabel={backLabel} />
  )
}
