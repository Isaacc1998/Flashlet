json.set! @flashcard.id do
  json.extract! @flashcard, :id, :front, :back, :set_id, :created_at, :updated_at
end