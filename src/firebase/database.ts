import { firebase, getCurrentUser } from './firebase'

const leaderboardPlaces = 10;

const addScore = async (name: string, score: number) => {
  await getCurrentUser()
  const db = firebase.firestore()
  const scores = db.collection('scores')
  await scores.add({name, score})
}

const getScores = async () => {
  await getCurrentUser()
  const db = firebase.firestore()
  const scores = db.collection('scores')
  const scoresSnapshot = await scores.orderBy('score', 'desc').limit(leaderboardPlaces).get()
  return scoresSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id})) as { name: string, score: number, id: string }[]
}

export { addScore, getScores, leaderboardPlaces }