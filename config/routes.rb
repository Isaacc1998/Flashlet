Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :flashcard_sets, only: [:index, :show, :create, :update, :destroy] do 
      resources :flashcards, only: [:index, :show, :create, :update, :destroy] 
    end
    resources :histories, only: [:index, :show, :create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end


